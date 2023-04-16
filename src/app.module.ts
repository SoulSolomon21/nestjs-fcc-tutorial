import { Module } from '@nestjs/common';

@Module({
  imports: [],
})
export class AppModule {}
// this is the main module that will be importing the rest of the other modules
// A module is any class annotated with the @Module decorator
// a dedcorator is a function that adds metadata or more properties to a class
