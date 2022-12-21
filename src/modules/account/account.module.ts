import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { AuthService } from "./auth.service";
import { AccountRepository } from "./dal/account.repository";

@Module({
  providers: [
    AccountController,
    AccountService,
    AuthService,
    AccountRepository,
  ],
  exports: [AccountService, AccountRepository, AuthService],
})
export class AccountModule { }
