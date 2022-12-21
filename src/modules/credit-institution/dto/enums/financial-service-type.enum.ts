import { registerEnumType } from "@nestjs/graphql";

export enum FinancialServiceTypeEnum {
  SECURITIES_INSURANCES = "securitiesIssuances",
  SECURITITES_TRANSDER_ORDERS = "securitiesTransferOrders",
  SECURITIES_OTHER = "securitiesOther",
  CLEARING_AND_SETTLEMENT = "clearingAndSettlement",
  CUSTODY_AND_OTHER = "custodyAndOther",
  STRUCTURED_FINANCE = "structuredFinance",
  FEES = "fees",
  OTHER = "other",
  PAYMENT_SERVICES = "paymentServices",
}
registerEnumType(FinancialServiceTypeEnum, {
  name: "FinancialServiceTypeEnum",
});
