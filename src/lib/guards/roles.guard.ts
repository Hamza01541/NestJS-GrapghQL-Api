import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Context } from "../context";
import { Roles } from "../enums";
import { AccountRepository } from "../../modules/account/dal/account.repository";
import { ROLES_KEY } from "../../modules/account/constants";
import { ForbiddenError, UnauthorizedError } from "../errors";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _accountRepository: AccountRepository
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const appContext =
      GqlExecutionContext.create(context).getContext<Context>();

    if (!appContext.userSession) {
      throw UnauthorizedError();
    }

    const requiredRoles = this._reflector.getAllAndOverride<Roles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    const account =
      appContext.account ??
      (await this._accountRepository.findOne({
        query: { cognitoId: appContext.userSession.localId },
      }));

    appContext.account = account;

    if (!requiredRoles?.length) {
      return true;
    }

    const isAllowed = requiredRoles.every((role) =>
      account?.roles.includes(role)
    );

    if (!isAllowed) {
      throw ForbiddenError();
    }

    return isAllowed;
  }
}
