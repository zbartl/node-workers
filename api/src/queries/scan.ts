import { injectable } from 'inversify';
import { Scan, Result } from '../schema';
import { QueryHandler, ScanIpQuery } from '../interfaces/queries';
import { RequestExchange } from '../exchanges';
import { ResponseQueue } from '../queues';
import * as uuid from 'uuid/v4';

@injectable()
export class ScanIpQueryHandler implements QueryHandler<ScanIpQuery, Scan> {
  constructor(private requestExchange: RequestExchange, private responseQueue: ResponseQueue) {
    this.responseQueue.subscribe(
      message => {
        this.responseQueue.emit(message.properties.correlationId, message);
      },
      { noAck: true }
    );
  }

  public async handle(req: ScanIpQuery) {
    const data = new Scan({ ip: req.scan.ip, results: new Array<Result>() });

    console.log(`requesting for: ${req.scan.ip}`);
    await Promise.all(
      req.scan.services.map(async service => {
        const correlationId = uuid();
        await this.requestExchange.publish({ ip: req.scan.ip, service }, undefined, {
          replyTo: process.env.RESPONSE_QUEUE,
          correlationId
        });
        console.log(`sent: ${service}`);

        const reply = await this.responseQueue.replyOf(correlationId);
        console.log(`reply: ${service}`);
        data.results.push(new Result({ id: correlationId, service, result: reply.content.toString() }));
      })
    );

    return data;
  }
}
