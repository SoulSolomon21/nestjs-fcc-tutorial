// controllers are responsible for handling incoming requests and returning responses to the client
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // the @Req() decorator helps us to access the request object, it comes from express
    // but it is not advisable to use the request object directly, so instead, we can use the @Body() decorator
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
// the controller will need to call the service, but to do so, it will need to instantiate an AuthService object
// dependency injection helps us to manage when and how the AuthService in instantiated
