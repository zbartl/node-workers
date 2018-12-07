import { ReplyableMessage } from 'coconspirators';
import {
  IntegrationType,
  IntegrationRequest,
  Integration,
  DefaultRequest,
  BasicRequest
} from './interfaces/integration-requests';
import { Request } from './interfaces/amqp';
import { inject, injectable, multiInject } from 'inversify';

function integration(
  r: IntegrationRequest,
  integrations: Array<Integration<IntegrationRequest>>,
  defaultIntegration: Integration<DefaultRequest>
) {
  const integrationToRun = (integrations || []).find(i => i && i.requestType === r.type);
  if (!integrationToRun) {
    defaultIntegration.run(r as DefaultRequest);
  } else {
    integrationToRun.run(r);
  }
}

class IntegrationResolver {
  public static resolve(message: ReplyableMessage<Request>): IntegrationRequest {
    console.log(`received: ${message.body.service}`);
    const integrationTypeKey = Object.keys(IntegrationType).find(k => IntegrationType[k] === message.body.service);

    if (integrationTypeKey) {
      return { type: IntegrationType[integrationTypeKey], message };
    }
    return { type: IntegrationType.default, serviceRequested: message.body.service, message };
  }
}

@injectable()
export class IntegrationEngine {
  constructor(
    @inject('DefaultIntegration') private defaultIntegration: Integration<DefaultRequest>,
    @multiInject('Integration') private integrations: Array<Integration<BasicRequest>>
  ) {}

  public run(message): void {
    integration(IntegrationResolver.resolve(message), this.integrations, this.defaultIntegration);
  }
}
