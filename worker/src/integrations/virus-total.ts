import { Integration, IntegrationType, BasicRequest } from '../interfaces/integration-requests';
import request = require('request');
import { injectable } from 'inversify';

@injectable()
export class VirusTotalIntegration implements Integration<BasicRequest> {
  requestType: IntegrationType = IntegrationType.virusTotal;
  public run(req: BasicRequest) {
    const url = 'https://www.virustotal.com/vtapi/v2/ip-address/report';
    const query = '?ip=' + req.message.body.ip + '&apikey=' + process.env.VIRUS_TOTAL_API_KEY;
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
