import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Result {
  @Field()
  id: string;

  @Field()
  service: string;

  @Field()
  result: string;

  public constructor(init?: Partial<Result>) {
    Object.assign(this, init);
  }
}

@ObjectType()
export class Scan {
  @Field()
  ip: string;

  @Field(_ => [Result])
  results: Result[];

  public constructor(init?: Partial<Scan>) {
    Object.assign(this, init);
  }
}
