import { FastifyRequest } from "fastify";
import { AccountDto } from "../modules/account/dto/account.dto";
import { UserSessionDto } from "../modules/account/dto/user-session.dto";

export interface Context {
  request: FastifyRequest;
  userSession?: UserSessionDto;
  account?: AccountDto;
}
