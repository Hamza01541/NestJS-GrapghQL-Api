import { ObjectType } from '@nestjs/graphql';
import { PaginatedDto } from '../../../lib/interfaces/paginated.dto';
import { AccountDto } from './account.dto';

@ObjectType()
export class PaginatedAccountsDto extends PaginatedDto(AccountDto) {}
