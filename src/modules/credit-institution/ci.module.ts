import { Module } from "@nestjs/common";
import { CIProfileController } from "./ci-profile/ci-profile.controller";
import { CIProfileService } from "./ci-profile/ci-profile.service";
import { CIProfileRepository } from "./ci-profile/dal/ci-profile.repository";
import { CreditInstitutionController } from "./ci.controller";
import { CreditInstitutionResolver } from "./ci.resolvers";
import { CreditInstitutionService } from "./ci.service";
import { CreditInstitutionRepository } from "./dal/ci.repository";

@Module({
  providers: [
    CreditInstitutionController,
    CreditInstitutionService,
    CreditInstitutionRepository,
    CreditInstitutionResolver,
    // profile
    CIProfileService,
    CIProfileRepository,
    CIProfileController,
  ],
  exports: [
    CreditInstitutionService,
    CreditInstitutionRepository,

    // profile
    CIProfileService,
    CIProfileRepository,
  ],
})
export class CreditInstitutionModule {}
