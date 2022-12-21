import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BaseDto } from "src/lib/interfaces/base-dto";

@InputType("CreditInstInputDto")
@ObjectType()
export class CreditInstitutionDto extends BaseDto {
  // @NOTE: quick fix because it cannot be empty
  @Field()
  _id: string;
}
