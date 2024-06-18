import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthenticationResult {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  token: string;
}
