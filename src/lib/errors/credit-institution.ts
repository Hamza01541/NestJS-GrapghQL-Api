import { makeGraphqlError } from "./make-graphql-error";

export const CIErrorProfileNotFound = makeGraphqlError({
  type: "PROFILE_NOT_FOUND",
  code: "PROFILE_NOT_FOUND",
  description: "This profile does not exist",
});
