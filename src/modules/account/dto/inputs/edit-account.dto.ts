import { InputType, OmitType } from '@nestjs/graphql';
import { NewAccountInputDto } from './new-account-input.dto';

@InputType()
export class EditAccountInputDto extends OmitType(NewAccountInputDto, [
  'email',
  'password',
  'passwordConfirmation',
] as const) {}
