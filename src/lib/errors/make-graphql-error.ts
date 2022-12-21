import {
  ErrInvoker,
  MakeErrorOptions,
  ErrPreprocessFunction,
  makeError,
} from "@makeit-studio/errors";

import { ApolloError } from "apollo-server-errors";

const makeErrorHandler: ProxyHandler<ErrInvoker> = {
  apply: (target, thisArg, argArray) => {
    const err = target(...argArray);
    // @NOTE: for legacy
    const data = argArray[0] || {};
    const apolloError = new ApolloError(
      err.description,
      err.code.toString(),
      data
    );

    // apolloError.originalError = err;

    return apolloError;
  },
};

const INTERNAL_ERROR: MakeErrorOptions = {
  code: "INTERNAL_ERROR",
  type: "INTERNAL_ERROR",
  description: "An error occured",
};

type OptionalErrPreprocessFunction = (
  ...args: any[]
) => Partial<MakeErrorOptions>;

const makeMercuriusError = (
  opts: Partial<MakeErrorOptions>,
  preprocess?: OptionalErrPreprocessFunction
): ErrInvoker => {
  const _opt: MakeErrorOptions = { ...INTERNAL_ERROR, ...opts };
  const _preprocess: ErrPreprocessFunction | undefined =
    typeof preprocess !== "undefined"
      ? (...args: any[]) => ({ ..._opt, ...(preprocess?.(...args) || {}) })
      : undefined;

  return new Proxy(makeError(_opt, _preprocess), makeErrorHandler);
};

export const makeGraphqlError = makeMercuriusError;
