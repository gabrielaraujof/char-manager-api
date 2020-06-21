import { OAuthProvider } from './oauth-provider.enum';
import { User } from './user.entity';

interface IOAuthInfo {
  id: string;
  provider: OAuthProvider;
}

export class JwtPayload {
  email: string;
  name: string;
  oauth: IOAuthInfo | null;

  constructor({ email, fullName, thirdPartyId: id, provider }: User) {
    this.email = email;
    this.name = fullName;
    this.oauth = id && provider ? { id, provider } : null;
  }
}
