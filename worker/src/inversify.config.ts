import { Container, decorate, injectable } from 'inversify';
import { Integration, DefaultRequest, BasicRequest } from './interfaces/integration-requests';
import { VirusTotalIntegration } from './integrations/virus-total';
import { AmqpClient } from 'coconspirators';
import { App } from './app';
import { AmqpServer } from './server';
import { RequestExchange } from './exchanges';
import { RequestQueue } from './queues';
import { IntegrationEngine } from './integration-engine';
import { EventEmitter } from 'events';
import { DefaultIntegration } from './integrations/default';
import { IpStackIntegration } from './integrations/ip-stack';
import { TcpPortScanIntegration } from './integrations/tcp-scan';

// hack for optional dep in coconspirators
@injectable()
class ExchangeOptions {}

@injectable()
class QueueOptions {}

const container = new Container();

decorate(injectable(), EventEmitter);
decorate(injectable(), AmqpClient);

container
  .bind<Integration<DefaultRequest>>('DefaultIntegration')
  .to(DefaultIntegration)
  .inSingletonScope();
container
  .bind<Integration<BasicRequest>>('Integration')
  .to(VirusTotalIntegration)
  .inSingletonScope();
container
  .bind<Integration<BasicRequest>>('Integration')
  .to(IpStackIntegration)
  .inSingletonScope();
container
  .bind<Integration<BasicRequest>>('Integration')
  .to(TcpPortScanIntegration)
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
  .bind(RequestQueue)
  .toSelf()
  .inSingletonScope();
container
  .bind(IntegrationEngine)
  .toSelf()
  .inSingletonScope();
container.bind(App).toSelf();

export { container };
