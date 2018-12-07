import { Integration, IntegrationType, BasicRequest } from '../interfaces/integration-requests';
import request = require('request');
import { injectable } from 'inversify';

@injectable()
export class IpStackIntegration implements Integration<BasicRequest> {
  requestType: IntegrationType = IntegrationType.ipStack;
  public run(req: BasicRequest) {
    const url = `http://api.ipstack.com/${req.message.body.ip}`;
    const query = `?access_key=${process.env.IP_STACK_API_KEY}&format=1`;
    const options = {
      uri: url + query
    };

    request.get(options.uri, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      req.message.reply(body);
    });
  }
}
