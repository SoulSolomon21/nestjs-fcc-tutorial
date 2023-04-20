import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// this decorator makes the Prisma Service availbale to all modules in our app
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
