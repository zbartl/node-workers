import { Queue, AmqpQueue, AmqpClient, QueueOptions } from 'coconspirators';
import { Request } from './interfaces/amqp';
import { injectable, inject } from 'inversify';

@injectable()
@Queue({
  name: process.env.REQUEST_QUEUE,
  contentType: 'application/json'
})
export class RequestQueue extends AmqpQueue<Request> {
  constructor(client: AmqpClient, @inject('QueueOptions') options?: QueueOptions) {
    super(client, options);
  }
}
