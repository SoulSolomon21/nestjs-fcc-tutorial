import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    // super calls the constructor of the parent class which is PrismaClient
    super({
      datasources: {
        db: {
          // this is the url to our database
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
}
