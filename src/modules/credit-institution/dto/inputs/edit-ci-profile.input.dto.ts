import { InputType, OmitType } from "@nestjs/graphql";
import { NewCreditInstitutionProfileInput } from "./new-ci-profile.input.dto";

@InputType()
export class EditCreditInstitionProfileInput extends OmitType(
  NewCreditInstitutionProfileInput,
  ["year"] as const
) {}
