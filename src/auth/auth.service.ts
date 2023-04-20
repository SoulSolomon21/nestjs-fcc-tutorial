/* eslint-disable prettier/prettier */
// services are responsible for handling the business logic
// services are annotated with the Injectable decorator

import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signin() {
    return { msg: 'I have signed in' };
  }

  signup() {
    return { msg: 'I have signed up' };
  }
}
// the Injectable decorator means that the class is going to be able to use the dependency injections that
// nestjs uses under the hood