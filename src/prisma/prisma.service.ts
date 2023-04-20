import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // super calls the constructor of the parent class which is PrismaClient
    super({
      datasources: {
        db: {
          // this is the url to our database
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
}
