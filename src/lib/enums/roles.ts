import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

registerEnumType(Roles, {
  name: 'Roles',
});
