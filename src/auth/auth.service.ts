/* eslint-disable prettier/prettier */
// services are responsible for handling the business logic
// services are annotated with the Injectable decorator
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  signin() {
    return { msg: 'I have signed in' };
  }

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
        }
      })

      // this is going to delete the hash property from the user object
      delete user.hash;
      // return the user
      return user;
    } catch (error) {
      // this checks if the error comes from Prisma
      if (error instanceof PrismaClientKnownRequestError) {
        // this error code comes from prisma and indicates that the error is a prisma duplicate field error
        if (error.code === "P2002") {
          throw new ForbiddenException('Credentials Taken')
        }
      }
    }
  }
}
// the Injectable decorator means that the class is going to be able to use the dependency injections that
// nestjs uses under the hood
