import { makeGraphqlError } from "./make-graphql-error";

export const UnknownAccountError = makeGraphqlError({
  type: "UNKNOWN_ACCOUNT_ERROR",
  code: "UNKNOWN_ACCOUNT_ERROR",
  description: "Unknown account.",
});

export const AccountAlreadyExistsError = makeGraphqlError({
  type: "ACCOUNT_ALREADY_EXISTS_ERROR",
  code: "ACCOUNT_ALREADY_EXISTS_ERROR",
  description: "Account already exists.",
});

export const PasswordConfirmationError = makeGraphqlError({
  type: "PASSWORD_CONFIRMATION_ERROR",
  code: "PASSWORD_CONFIRMATION_ERROR",
  description: "Password confirmation does not match.",
});

export const NewAccountValidationError = makeGraphqlError({
  type: "NEW_ACCOUNT_VALIDATION_ERROR",
  code: "NEW_ACCOUNT_VALIDATION_ERROR",
  description: "Invalid new account information.",
});

export const RegisterNewAccountError = makeGraphqlError({
  type: "REGISTER_NEW_ACCOUNT_ERROR",
  code: "REGISTER_NEW_ACCOUNT_ERROR",
  description: "An error occurred while creating the account",
});

export const LoginFailedError = makeGraphqlError({
  type: "LOGIN_FAILED_ERROR",
  code: "LOGIN_FAILED_ERROR",
  description: "Login failed. PLease verify your credentials",
});

export const BadCredentialsError = makeGraphqlError({
  type: "BAD_CREDENTIALS_ERROR",
  code: "BAD_CREDENTIALS_ERROR",
  description: "Bad credentials error",
});

export const InvalidTokenError = makeGraphqlError(
  {
    type: "INVALID_TOKEN_ERROR",
    code: "INVALID_TOKEN_ERROR",
  },
  (reason) => ({
    description: `An error occured while validating the token. ${reason}`,
  })
);

export const SignUpFailedError = makeGraphqlError({
  type: "INVALID_TOKEN_ERROR",
  code: "INVALID_TOKEN_ERROR",
  description: "An error occured while signing up new user.",
});

export const UpdatePasswordError = makeGraphqlError({
  type: "UPDATE_PASSWORD_ERROR",
  code: "UPDATE_PASSWORD_ERROR",
  description: "An error occured while updating password.",
});

export const UpdateEmailError = makeGraphqlError({
  type: "UPDATE_EMAIL_ERROR",
  code: "UPDATE_EMAIL_ERROR",
  description: "An error occured while updating email.",
});

export const DeleteUserError = makeGraphqlError({
  type: "DELETE_USER_ERROR",
  code: "DELETE_USER_ERROR",
  description: "An error occured while deleting user.",
});

export const ForbiddenError = makeGraphqlError({
  type: "FORBIDDEN_ERROR",
  code: "FORBIDDEN_ERROR",
  description: "Forbidden resource.",
});

export const UnauthorizedError = makeGraphqlError({
  type: "UNAUTHORIZED_ERROR",
  code: "UNAUTHORIZED_ERROR",
  description: "Unauthorized.",
});
