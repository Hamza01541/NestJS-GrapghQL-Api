import { Injectable } from "@nestjs/common";
import { Args, ResolveField, Resolver, Root } from "@nestjs/graphql";
import { CIProfileDto } from "./ci-profile/dto/ci-profile.dto";
import { CreditInstitutionService } from "./ci.service";
import { CreditInstitutionDto } from "./dto/ci.dto";

@Resolver(CreditInstitutionDto)
@Injectable()
export class CreditInstitutionResolver {
  constructor(
    private readonly _creditInstitutionService: CreditInstitutionService
  ) {}

  @ResolveField(() => CIProfileDto, {
    nullable: true,
    description: "get profile by year",
  })
  profile(
    @Root() ci: CreditInstitutionDto,
    @Args("year")
    year: string
  ): Promise<CIProfileDto | undefined> {
    if (!year) year = new Date().getFullYear().toString();

    const args = {
      year,
      organisationId: ci._id,
    };

    return this._creditInstitutionService.profile(args);
  }

  @ResolveField(() => [CIProfileDto], {
    nullable: true,
    description:
      "get profiles by years. If no arguments passed, return all profiles",
  })
  profiles(
    @Root() ci: CreditInstitutionDto,
    @Args("years", { type: () => [String] }) years: string[]
  ): Promise<CIProfileDto[] | undefined> {
    const args = { organisationId: ci._id, years };

    return this._creditInstitutionService.profiles(args);
  }
}
