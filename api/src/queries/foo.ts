import { injectable } from 'inversify';
import { QueryHandler, FooQuery } from '../interfaces/queries';

@injectable()
export class FooQueryHandler implements QueryHandler<FooQuery, string> {
  public async handle(req: FooQuery) {
    return req.bar;
  }
}
