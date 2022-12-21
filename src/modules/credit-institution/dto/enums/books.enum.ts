import { registerEnumType } from "@nestjs/graphql";

export enum BooksEnum {
  BANKING_BOOK = "bankingBook",
  TRADING_BOOK = "tradingBook",
  OFF_BALANCE_BOOK = "offBalanceBook",
  COMMISSION_BOOK = "commissionBook",
}

registerEnumType(BooksEnum, {
  name: "BooksEnum",
});
