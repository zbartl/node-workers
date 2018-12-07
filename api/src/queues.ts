import { Queue, AmqpQueue, AmqpClient, QueueOptions } from 'coconspirators';
import { Response } from './interfaces/amqp';
import { injectable, inject } from 'inversify';

@injectable()
@Queue({
  name: process.env.RESPONSE_QUEUE,
  contentType: 'application/json',
  rpc: true
})
export class ResponseQueue extends AmqpQueue<Response> {
  constructor(client: AmqpClient, @inject('QueueOptions') options?: QueueOptions) {
    super(client, options);
  }
}
