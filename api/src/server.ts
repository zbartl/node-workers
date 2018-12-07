import { AmqpClient } from 'coconspirators';
import { injectable } from 'inversify';

@injectable()
export class AmqpServer {
  connection: Promise<any>;
  constructor(public client: AmqpClient) {
    this.connection = this.client.connect(process.env.AMQP_HOST);

    client.on('connected', () => console.log('connected!'));
    client.on('disconnected', () => console.log('disconnected!'));
  }
}
