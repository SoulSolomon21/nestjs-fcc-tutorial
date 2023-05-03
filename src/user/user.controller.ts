import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  // this decorator is used to guard our endpoint and it takes in the guard that we want to use
  @UseGuards(AuthGuard('jwt')) //this is telling nest the this route is to be protected by the 'jwt' strategy
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
// to protect an endpoint, we use guards
// a guard is a function that is placed infront of an endpoint/route handler
// to allow or not allow the execution of that endpoint
// our guard wil check for the stategy and if the jwt strategy is correct, it will allow the execution of the endpoint and if not, it will block it
// guards can be implemented at the global level or at the route level
// When @UseGuards is used at the controller level, the guard will be applied to every handler (method) in the controller.
// When @UseGuards is used at the individual handler level, the guard will apply only to that specific method.
