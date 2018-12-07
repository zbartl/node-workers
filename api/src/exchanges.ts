import { Exchange, ExchangeType, AmqpExchange, AmqpClient, ExchangeOptions } from 'coconspirators';
import { Request } from './interfaces/amqp';
import { injectable, inject } from 'inversify';

@injectable()
@Exchange({
  name: process.env.REQUEST_EXCHANGE || '',
  type: ExchangeType.fanout,
  contentType: 'application/json'
})
export class RequestExchange extends AmqpExchange<Request> {
  constructor(client: AmqpClient, @inject('ExchangeOptions') options?: ExchangeOptions) {
    super(client, options);
  }
}
