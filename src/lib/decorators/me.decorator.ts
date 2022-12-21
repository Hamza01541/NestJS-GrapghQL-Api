import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Context } from "../context";

export const Me = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const appContext =
      GqlExecutionContext.create(context).getContext<Context>();

    return appContext.account;
  }
);
