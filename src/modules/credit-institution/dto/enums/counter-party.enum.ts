import { registerEnumType } from "@nestjs/graphql";

export enum CounterPartyType {
  CREDIT_INSTITUTION = "creditInstitution",
  INVESTMENT_FIRM = "investmentFirm",
  MANAGEMENT_COMPANY = "managementCompany",
  INSURANCE_UNDERTAKING = "insuranceUndertaking",
  NON_FINANCIAL_CORPORATE = "nonFinancialCorporate",
  HOUSEHOLD = "household",
  LOCAL_GOUVERNMENT = "localGovernment",
  REPOSESSED_REAL_ESTATE = "repossessedRealEstate",
  NON_FINANCIAL_CORPORATE_NO_NFRD = "nonFinancialCorporateNoNfrd",
  NON_FINANCIAL_CORPORATE_NO_NFRD_LOAN = "nonFinancialCorporateNoNfrdLoan",
  NO_COUNTER_PARTY = "noCounterParty",
  FINANCIAL_CORPORATE_NO_NFRD = "financialCorporateNoNfrd",
}

registerEnumType(CounterPartyType, {
  name: "CounterPartyType",
});
