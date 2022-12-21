import { InputType, OmitType } from "@nestjs/graphql";
import { CIProfileDto } from "../../ci-profile/dto/ci-profile.dto";

@InputType()
export class NewCreditInstitutionProfileInput extends OmitType(CIProfileDto, [
  "_id",
  "createdAt",
  "updatedAt",
  "bankingBook",
  "tradingBook",
  "offBalanceBook",
  "commissionBook",
] as const) {}
