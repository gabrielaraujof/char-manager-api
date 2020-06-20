import { OAuthProvider } from './oauth-provider.enum';

export interface JwtPayload {
  email: string;
  oauth?: {
    id: string;
    provider: OAuthProvider;
  };
}
