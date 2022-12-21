export interface UserIdentity {
  email?: string;
  claims?: { [k: string]: any };
  emailVerified?: boolean;
  disabled?: boolean;
  metadata?: any;
  // @TODO: define data
  providerData?: Array<any>;
  tenantId?: string | null;
  uid: string;
}
