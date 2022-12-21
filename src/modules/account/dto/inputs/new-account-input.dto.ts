import { InputType, OmitType, Field } from '@nestjs/graphql';
import { AccountDto } from '../account.dto';

@InputType()
export class NewAccountInputDto extends OmitType(AccountDto, [
  '_id',
  'createdAt',
  'updatedAt',
  'verified',
] as const) {
  @Field()
  password: string;

  @Field()
  passwordConfirmation: string;
}
