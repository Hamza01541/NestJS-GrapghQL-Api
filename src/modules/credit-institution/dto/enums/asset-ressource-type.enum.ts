import { registerEnumType } from "@nestjs/graphql";

export enum AssetResourceType {
  COMPANY = "company",
  COMPANY_DEBT = "companyDebt",
  FUND = "fund",
  MANAGEMENT_INSTITUTION = "managementInstitution",
  CREDIT_INSTITUTION = "creditInstitution",
  CREDIT_INSTITUTION_DEBT = "creditInstitutionDebt",
  INVESTMENT_FIRM = "investmentFirm",
  INVESTMENT_FIRM_DEBT = "investmentFirmDebt",
  INSURANCE_UNDERTAKING = "insuranceUndertaking",
  INSURANCE_UNDERTAKING_DEBT = "insuranceUndertakingDebt",
  MANAGEMENT_INSTITUTION_DEBT = "managementInstitutionDebt",
  FUND_DEBT = "fundDebt",
  OTHER = "other",
  UNDEFINED = "undefined",
  UNDEFINED_DEBT = "undefinedDebt",
}
registerEnumType(AssetResourceType, {
  name: "AssetResourceType",
});
