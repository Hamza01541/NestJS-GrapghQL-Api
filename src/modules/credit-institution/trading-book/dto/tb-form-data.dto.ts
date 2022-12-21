import { InputType, ObjectType, Field } from "@nestjs/graphql";
import { EngineFileLinkDto } from "src/lib/interfaces/engine-link.dto";
import { TradingBookFormAnswerDto } from "./tb-form-answer.dto";
import { TradingBookTotalCoveredAssetDto } from "./tb-total-covered-asset.dto";

@InputType("TBFormDataInputDto")
@ObjectType()
export class TradingBookFormDataDto {
  @Field({ nullable: true })
  trends?: string;

  @Field({ nullable: true })
  investmentPolicy?: string;

  @Field({ nullable: true })
  potentialLimits?: string;

  @Field(() => TradingBookTotalCoveredAssetDto, { nullable: true })
  totalCoveredAsset?: TradingBookTotalCoveredAssetDto;

  @Field(() => Date, { nullable: true })
  accountingDate?: Date;

  @Field(() => [EngineFileLinkDto], { nullable: true })
  files?: EngineFileLinkDto[];

  @Field(() => TradingBookFormAnswerDto)
  institutionSize: TradingBookFormAnswerDto;

  @Field(() => TradingBookFormAnswerDto)
  institutionSizeMarketRisk: TradingBookFormAnswerDto;
}
