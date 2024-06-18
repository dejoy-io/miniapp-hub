import { ObjectType, Field } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-scalars';

@ObjectType()
export class User {
  @Field(() => Number, { name: 'id' })
  id: number;

  @Field()
  firstName: string;


  @Field(() => GraphQLJSON, {nullable: true})
  metadata: object;

  @Field()
  created_at: Date; // 2024-05-06T15:57:06.830725+00:00
}
