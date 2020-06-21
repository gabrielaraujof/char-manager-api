import { OAuthProvider } from '../oauth-provider.enum';

export class OAuthProfileDto {
  email: string;
  firstName: string;
  lastName: string;
  thirdPartyId: string;
  provider: OAuthProvider;
}
