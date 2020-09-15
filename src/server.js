import { Server, Model, belongsTo, hasMany, Factory } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
  let server = new Server({
    environment,
    models: {
      user: Model,
      deck: Model.extend({
        data: hasMany('flashcard')
      }),
      flashcard: Model.extend({
        deck: belongsTo()
      })
    },
    factories: {
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
      server.create('user', { userId: '123', isAuthenticated: true });
      server.create('deck', {
        name: 'Test 1',
        editable: true,
        data: server.createList('flashcard', 5),
        cardCount: 5
      });
    },

    routes() {
      this.namespace = '/api';
      this.passthrough('https://api.unsplash.com/search/**');
      this.get('/decks', (schema) => {
        console.log(schema.decks.all());
        return schema.db.decks;
      });

      this.get('/deck/:id', (schema, request) => {
        console.log(schema.decks.find(request.params.id));
        return schema.db.flashcards.where({ deckId: request.params.id });
      });

      this.post('/deck', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const newDeck = schema.create('deck', {
          name: data.deckName,
          editable: true,
          data: []
        });
        schema.create('flashcard', { deckId: newDeck.id, ...data.card });
        return newDeck.id;
      });

      this.post('/deck/:id/card', (schema, request) => {
        const deckId = request.params.id;
        const data = JSON.parse(request.requestBody);
        return schema.create('flashcard', { deckId, ...data });
      });

      this.put('/deck/:deckId/card/:cardId', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const card = schema.flashcards.find(request.params.cardId);
        card.update({ ...data });
      });

      this.del('/deck/:id', (schema, request) => {
        const deck = schema.decks.find(request.params.id);
        deck.destroy();
      });

      this.del('/deck/:deckId/card/:cardId', (schema, request) => {
        const card = schema.flashcards.find(request.params.cardId);
        card.destroy();
      });
    }
  });

  return server;
}
