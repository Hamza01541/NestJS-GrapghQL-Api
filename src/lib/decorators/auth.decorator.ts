import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Roles } from '../enums';
import { ROLES_KEY } from '../../modules/account/constants';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (...roles: Roles[]) =>
  applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(AuthGuard, RolesGuard));
