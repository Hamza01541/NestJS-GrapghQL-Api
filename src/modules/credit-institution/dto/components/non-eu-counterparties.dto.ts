import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { FinancialsDto } from "./financials.dto";

@InputType('NonEUCounterpartiesInputDto')
@ObjectType()
export class NonEUCounterpartiesDto {
    @Field(() => FinancialsDto)
    total: FinancialsDto;

    @Field(() => FinancialsDto)
    loanAdvance: FinancialsDto;

    @Field(() => FinancialsDto)
    debtSecurity: FinancialsDto;

    @Field(() => FinancialsDto)
    equityInstruments: FinancialsDto;
}