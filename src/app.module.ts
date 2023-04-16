import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
// this is the main module that will be importing the rest of the other modules
// A module is any class annotated with the @Module decorator
// a dedcorator is a function that adds metadata or more properties to a class
// modules help to organise your code
