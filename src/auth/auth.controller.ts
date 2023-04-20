// controllers are responsible for handling incoming requests and returning responses to the client
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  @Post('signin')
  signin() {
    return this.authService.signin();
  }
}
// the controller will need to call the service, but to do so, it will need to instantiate an AuthService object
// dependency injection helps us to manage when and how the AuthService in instantiated
