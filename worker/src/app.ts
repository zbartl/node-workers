import { injectable } from 'inversify';
import { AmqpServer } from './server';
import { RequestExchange } from './exchanges';
import { RequestQueue } from './queues';
import { IntegrationEngine } from './integration-engine';

@injectable()
export class App {
  constructor(
    private amqp: AmqpServer,
    private requestExchange: RequestExchange,
    private requestQueue: RequestQueue,
    private integrationEngine: IntegrationEngine
  ) {}

  async start() {
    this.requestExchange.bindQueue(process.env.WORKER_QUEUE || '', '');
    this.requestQueue.subscribe(async message => {
      this.integrationEngine.run(message);
    });
  }
}
