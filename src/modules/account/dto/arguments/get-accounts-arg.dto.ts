import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { SortByDirection } from '../../../../lib/enums/sort-by-direction';
import { PaginationArgDto } from '../../../../lib/interfaces/pagination-arg.dto';

@InputType()
class AccountSearchDto {
  @Field({ nullable: true })
  email?: string;
}

@InputType()
class AccountSortByDto {
  @Field(() => SortByDirection, { nullable: true })
  email?: SortByDirection;
}

@ArgsType()
export class GetAccountsArgsDto extends PaginationArgDto({
  SearchByDtoClass: AccountSearchDto,
  SortByDtoClass: AccountSortByDto,
}) {}
