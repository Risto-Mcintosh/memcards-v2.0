import { Server, Model, RestSerializer } from 'miragejs';

// export interface Flashcard {
//   id?: string;
//   cardId?: string;
//   front: string;
//   back: string;
//   image: {
//     src?: string;
//     alt?: string;
//     thumb?: string;
//   } | null;
// }

// export interface User {
//   userName: string;
//   email: string;
// }

// export interface Deck {
//   name: string;
//   editable?: boolean;
//   data: Flashcard[];
// }

export function makeServer({ environment = 'test' } = {}) {
  let server = new Server({
    environment,
    serializers: {
      application: RestSerializer
    },
    models: {
      user: Model,
      deck: Model
    },

    seeds(server) {
      server.create('user', { userId: '123', isAuthenticated: true });
      server.create('deck', {
        name: 'Test 1',
        editable: true,
        data: []
      });
    },

    routes() {
      this.namespace = '/api';
      this.get('/decks', (schema) => {
        console.log(schema.decks.all());
        return schema.db.decks;
      });
      this.post('/deck', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        console.log(data);
        const newDeck = {
          name: data.deckName,
          editable: true,
          data: [data.card]
        };

        schema.create('deck', newDeck);
      });
    }
  });
  server.logging = true;
  return server;
}
