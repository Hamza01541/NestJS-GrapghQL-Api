import { InputType, OmitType, Field } from "@nestjs/graphql";
import { CreditInstitutionDto } from "../ci.dto";
import { BaseProfileDto } from "../components/base-profile.dto";

@InputType()
export class NewCreditInstitutionInput extends OmitType(CreditInstitutionDto, [
  "_id",
  "createdAt",
  "updatedAt",
] as const) {
  @Field(() => [BaseProfileDto], { nullable: true })
  profiles?: BaseProfileDto[];
}
