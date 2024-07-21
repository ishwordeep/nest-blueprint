import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('profile')
    getProfile(@GetUser() user: User) {
        return this.userService.getUser(user);
      }
}
