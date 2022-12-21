import { Field, ObjectType, InputType } from "@nestjs/graphql";
import { Roles } from "../../../lib/enums";
import { BaseDto } from "../../../lib/interfaces/base-dto";
// import { AccountSettingsComponentDto } from './components/account-settings.dto';

@InputType("AccountInputDto")
@ObjectType({ implements: () => [BaseDto] })
export class AccountDto implements BaseDto {
  _id: string;

  createdAt: Date;

  updatedAt: Date;

  verified: boolean;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  birthDate?: Date;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field()
  hasAcceptedTerms: boolean;

  roles: Roles[];

  // @Field(() => AccountSettingsComponentDto, { nullable: true })
  // settings?: AccountSettingsComponentDto;
}
