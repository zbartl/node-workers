import 'reflect-metadata';
import Koa = require('koa');
import { injectable } from 'inversify';
import { ApolloServer } from 'apollo-server-koa';
import { buildSchema } from 'type-graphql';
import { DataResolver } from './resolvers';
import { AmqpServer } from './server';

@injectable()
export class App {
  constructor(private amqp: AmqpServer) {}

  async start() {
    const schema = await buildSchema({
      resolvers: [DataResolver]
    });
    const server = new ApolloServer({ schema, tracing: true });

    const app = new Koa();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
  }
}
