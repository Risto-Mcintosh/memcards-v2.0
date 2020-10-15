import { Server, Model, belongsTo, hasMany, Factory } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  let server = new Server({
    environment,
    models: {
      user: Model.extend({
        deck: hasMany()
      }),
      deck: Model.extend({
        user: belongsTo(),
        data: hasMany('flashcard')
      }),
      flashcard: Model.extend({
        deck: belongsTo()
      })
    },
    factories: {
      deck: Factory.extend({
        name(i) {
          return `Test Deck ${i + 1}`;
        },
        cardCount: 0,
        editable: true
      }),
      flashcard: Factory.extend({
        front(i) {
          return `front ${i}`;
        },
        back(i) {
          return `back ${i}`;
        },
        image: {
          src:
            'https://images.unsplash.com/photo-1550029330-8dbccaade873?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0NDk5fQ',
          alt: 'some text',
          thumb:
            'https://images.unsplash.com/photo-1550029330-8dbccaade873?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjc0NDk5fQ'
        }
      })
    },

    seeds(server) {
      const user = server.create('user');
      server.createList('deck', 4, { user }).forEach((deck) => {
        deck.update({ data: server.createList('flashcard', 3), cardCount: 3 });
      });
    },

    routes() {
      this.namespace = '/api';
      this.passthrough('https://api.unsplash.com/search/**');
      this.get('/decks', (schema) => {
        return schema.db.decks;
      });

      this.get('/deck/:id', (schema, request) => {
        const deck = schema.db.decks.find(request.params.id);
        return {
          deckName: deck.name,
          cards: schema.db.flashcards.where({ deckId: request.params.id })
        };
      });

      this.post('/deck', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const newDeck = schema.create('deck', {
          name: data.deckName,
          editable: true,
          cardCount: 1,
          data: []
        });
        schema.create('flashcard', { deckId: newDeck.id, ...data.card });
        return newDeck.id;
      });

      this.post('/deck/:id/card', (schema, request) => {
        const deckId = request.params.id;
        const data = JSON.parse(request.requestBody);
        const deck = schema.decks.find(deckId);
        deck.update({ cardCount: ++deck.cardCount });
        schema.create('flashcard', { deckId, ...data });
        return 'card created!';
      });

      this.put('/deck/:deckId/card/:cardId', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const card = schema.flashcards.find(request.params.cardId);
        card.update({ ...data });
        return 'card edited!';
      });

      this.del('/deck/:id', (schema, request) => {
        const deck = schema.decks.find(request.params.id);
        deck.destroy();
        return 'deck deleted!';
      });

      this.del('/deck/:deckId/card/:cardId', (schema, request) => {
        const card = schema.flashcards.find(request.params.cardId);
        if (!card) return 'card not found';
        card.destroy();
        const deck = schema.decks.find(request.params.deckId);
        deck.update({ cardCount: --deck.cardCount });
        return 'card deleted!';
      });

      this.post('/login', (schema, request) => {
        const user = schema.users.find(1);
        return { userId: user.id };
      });

      this.delete('/logout', () => {
        return 'logged out';
      });

      this.post('/register', (schema, request) => {
        const { userName } = request.requestBody;
        const user = schema.users.create({ name: userName });
        return { userId: user.id };
      });
    }
  });
  return server;
}
