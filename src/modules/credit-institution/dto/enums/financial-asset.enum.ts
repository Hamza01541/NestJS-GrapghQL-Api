import { registerEnumType } from "@nestjs/graphql";

export enum FinancialAssetType {
  EQUITY = "equity",
  DEBT = "debt",
  GUARANTEES = "guarantees",
  LOAN_ADVANCE = "loanAdvance",
  REPOSESSED_REAL_ESTATE = "repossessedRealEstate",
  CASH = "cash",
  FUND = "fund",
}

registerEnumType(FinancialAssetType, {
  name: "FinancialAssetType",
});
