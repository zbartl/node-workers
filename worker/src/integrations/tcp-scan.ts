import { Integration, IntegrationType, BasicRequest } from '../interfaces/integration-requests';
import request = require('request');
import { injectable } from 'inversify';

@injectable()
export class TcpPortScanIntegration implements Integration<BasicRequest> {
  requestType: IntegrationType = IntegrationType.tcpPortScan;
  public run(req: BasicRequest) {
    const url = `https://api.hackertarget.com/nmap/?q=${req.message.body.ip}`;

    request.get(url, (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      req.message.reply(body);
    });
  }
}
