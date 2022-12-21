import { Injectable } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";
import { CIProfileDto } from "./dto/ci-profile.dto";
import { CIProfileService } from "./ci-profile.service";

@Resolver(CIProfileDto)
@Injectable()
export class CIProfileController {
  constructor(private readonly _ciProfileService: CIProfileService) {}

  /* QUERIES */

  /* MUTATIONS */

  /* FIELD RESOVLERS */
}

export default CIProfileController;
