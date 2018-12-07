import { Container, decorate, injectable } from 'inversify';
import { AmqpClient } from 'coconspirators';
import { App } from './app';
import { AmqpServer } from './server';
import { RequestExchange } from './exchanges';
import { EventEmitter } from 'events';
import { ResponseQueue } from './queues';
import { DataResolver } from './resolvers';
import { ScanIpQueryHandler } from './queries/scan';
import { QueryHandler, ScanIpQuery, FooQuery } from './interfaces/queries';
import { Scan } from './schema';
import { FooQueryHandler } from './queries/foo';

// hack for optional dep in coconspirators
@injectable()
class ExchangeOptions {}

@injectable()
class QueueOptions {}

const container = new Container();

decorate(injectable(), EventEmitter);
decorate(injectable(), AmqpClient);

container
  .bind<QueryHandler<FooQuery, string>>('QueryHandler<FooQuery, string>')
  .to(FooQueryHandler)
  .inSingletonScope();
container
  .bind<QueryHandler<ScanIpQuery, Scan>>('QueryHandler<ScanIpQuery, Scan>')
  .to(ScanIpQueryHandler)
  .inSingletonScope();

container
  .bind(AmqpClient)
  .toSelf()
  .inSingletonScope();
container
  .bind(AmqpServer)
  .toSelf()
  .inSingletonScope();
container.bind<ExchangeOptions>('ExchangeOptions').to(ExchangeOptions);
container
  .bind(RequestExchange)
  .toSelf()
  .inSingletonScope();
container.bind<QueueOptions>('QueueOptions').to(QueueOptions);
container
  .bind(ResponseQueue)
  .toSelf()
  .inSingletonScope();
container.bind(DataResolver).toSelf();
container.bind(App).toSelf();

export { container };
