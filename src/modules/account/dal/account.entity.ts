import { BaseEntity } from '../../../lib/interfaces/base-entity';
import { Roles } from '../../../lib/enums';
import { AccountSettings } from './components/account-settings';
// import { AccountSettings } from './components/account-settings';

export interface AccountEntity extends BaseEntity {
  cognitoId: string;

  verified: boolean;

  email: string;

  firstName?: string;

  lastName?: string;

  country?: string;

  gender?: string;

  birthDate?: Date;

  phoneNumber?: string;

  hasAcceptedTerms: boolean;

  roles: Roles[];
  // settings?: AccountSettings;
}
