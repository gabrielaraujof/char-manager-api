import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AccessTokenDto } from './dto/access-token.dto';
import { OAuthProfileDto } from './dto/validate-oauth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { email, password, firstName, lastName } = signUpDto;
    const user = this.userRepo.create();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = await user.hashPassword(password);
    try {
      await this.userRepo.save(user);
    } catch (err) {
      if (err.code === 11000) {
        // TODO: extract error codes (duplicated entry)
        throw new ConflictException('Email already in use');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(signInDto: SignInDto): Promise<AccessTokenDto> {
    const { email, password } = signInDto;
    const user = await this.userRepo.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      const accessToken = this.jwtService.sign({...new JwtPayload(user)});
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async validateOAuth(oauthProfile: OAuthProfileDto): Promise<AccessTokenDto> {
    try {
      const { thirdPartyId, provider } = oauthProfile;
      let user = await this.userRepo.findOne({ thirdPartyId, provider });
      if (!user) {
        user = this.userRepo.create(oauthProfile);
        await this.userRepo.save(user);
      }
      const accessToken = this.jwtService.sign({...new JwtPayload(user)});
      return { accessToken };
    } catch (err) {
      throw new InternalServerErrorException('Can\'t validate oAuth login', err.message);
    }
  }

  async validateOAuthUser({ oauth }: JwtPayload): Promise<User | null> {
    const { id: thirdPartyId, provider } = oauth;
    const user = await this.userRepo.findOne({ thirdPartyId, provider });
    //   TODO: maybe do some external validation on the issuer servers?
    return user || null;
  }

  async validateLocalUser({ email }: JwtPayload): Promise<User | null> {
    const user = await this.userRepo.findOne({ email });
    return user || null;
  }
}
