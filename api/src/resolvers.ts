import { ArgsType, Field, Resolver, Args, Query } from 'type-graphql';
import { Scan } from './schema';
import { injectable, inject } from 'inversify';
import { IsIP } from 'class-validator';
import { QueryHandler, ScanIpQuery } from './interfaces/queries';

@ArgsType()
export class IpArgs {
  @Field()
  @IsIP()
  ip: string;

  @Field(_ => [String], { nullable: true })
  services = ['virustotal'];
}

@injectable()
@Resolver(_ => Scan)
export class DataResolver {
  constructor(@inject('QueryHandler<ScanIpQuery, Scan>') private queryHandler: QueryHandler<ScanIpQuery, Scan>) {}

  @Query(_ => Scan)
  async scan(@Args() args: IpArgs): Promise<Scan> {
    return this.queryHandler.handle({ scan: args });
  }
}
