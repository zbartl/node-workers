import { ReplyableMessage } from 'coconspirators';
import { Request } from './amqp';

export enum IntegrationType {
  default = 'default',
  virusTotal = 'virustotal',
  ipStack = 'ipstack',
  tcpPortScan = 'tcpscan'
}

export interface BasicRequest {
  type: IntegrationType;
  message: ReplyableMessage<Request>;
}

export interface DefaultRequest extends BasicRequest {
  serviceRequested: string;
}

export type IntegrationRequest = BasicRequest | DefaultRequest;

export interface Integration<TRequest> {
  requestType: IntegrationType;
  run: (req: TRequest) => void;
}
