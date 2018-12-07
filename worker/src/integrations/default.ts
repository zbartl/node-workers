import { Integration, IntegrationType, DefaultRequest } from '../interfaces/integration-requests';
import { injectable } from 'inversify';

@injectable()
export class DefaultIntegration implements Integration<DefaultRequest> {
  requestType: IntegrationType = IntegrationType.default;
  public run(req: DefaultRequest) {
    const availableIntegrations: string[] = Object.keys(IntegrationType)
      .filter(k => k !== IntegrationType.default)
      .map(k => IntegrationType[k]);
    req.message.reply(
      `No integration available for ${
        req.serviceRequested
      }. Please try another integration from the following list: ${availableIntegrations}`
    );
  }
}
