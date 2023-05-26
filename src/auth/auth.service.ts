// services are responsible for handling the business logic
// services are annotated with the Injectable decorator
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);
    // use a try catch block to catch errors
    try {
      // save the user in the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      // this checks if the error comes from Prisma
      if (error instanceof PrismaClientKnownRequestError) {
        // this error code comes from prisma and indicates that the error is a prisma duplicate field error
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials Taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist, throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare passwords
    const pwMatches = await argon.verify(user.hash, dto.password);

    // if password is incorect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials Incorrect');

    // send back the user
    return this.signToken(user.id, user.email);
  }

  // this function will be used to sign the jwt token that will be returned to the user as they make requests
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payLoad = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payLoad, {
      expiresIn: '12h',
      secret: secret,
    });

    // once we give the token to a user, the user can use the platform for the specified time before they need to sign in again
    return {
      access_token: token,
    };
  }
}
// the Injectable decorator means that the class is going to be able to use the dependency injections that
// nestjs uses under the hood
