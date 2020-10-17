import { Entity, Column, ObjectID, ObjectIdColumn, Unique } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { OAuthProvider } from './oauth-provider.enum';

@Entity()
@Unique(['email', 'thirdPartyId', 'provider'])
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  salt: string;

  @Column()
  thirdPartyId: string;

  @Column()
  provider: OAuthProvider;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  async hashPassword(password: string): Promise<string> {
    if (!this.salt) {
      this.salt = await User.generateSalt();
    }
    return bcrypt.hash(password, this.salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    const encryptedPassword = await bcrypt.hash(password, this.salt);
    return encryptedPassword === this.password;
  }

  static async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }
}
