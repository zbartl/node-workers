import { IpArgs } from '../resolvers';

export interface ScanIpQuery {
  scan: IpArgs;
}

export interface FooQuery {
  bar: string;
}

export type Query = ScanIpQuery | FooQuery;

export interface QueryHandler<TQuery, TResult> {
  handle: (req: TQuery) => Promise<TResult>;
}
