import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OAuthProvider } from './oauth-provider.enum';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { email, password, firstName, lastName } = signUpDto;
    const user = this.userRepo.create();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = await user.hashPassword(password);
    try {
      return await this.userRepo.save(user);
    } catch (err) {
      if (err.code === 11000) {
        // TODO: extract error codes (duplicated entry)
        throw new ConflictException('Email already in use');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateOAuth(
    email: string,
    thirdPartyId: string,
    provider: OAuthProvider,
  ): Promise<string> {
    try {
      // You can add some registration logic here,
      // to register the user using their thirdPartyId (in this case their googleId)
      // let user: IUser = await this.usersService.findOneByThirdPartyId(thirdPartyId, provider);

      // if (!user)
      // user = await this.usersService.registerOAuthUser(thirdPartyId, provider);

      const payload: JwtPayload = {
        email,
        oauth: {
          id: thirdPartyId,
          provider,
        },
      };

      return this.jwtService.sign(payload);
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
