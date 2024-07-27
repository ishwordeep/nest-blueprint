<<<<<<< HEAD
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
=======
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
>>>>>>> dc337b2690b378a0fb643c8e90f4e6fc78219ad1
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
<<<<<<< HEAD
=======
import { ChangePasswordDTO, UpdateProfileDTO } from './dto';
>>>>>>> dc337b2690b378a0fb643c8e90f4e6fc78219ad1

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('profile')
  getProfile(@GetUser() user: User) {
    return this.userService.getUser(user);
  }
<<<<<<< HEAD
=======

  @Get('all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Patch('change-password')
  changePassword( @GetUser() user: User,@Body() changePasswordDTO: ChangePasswordDTO) {
    return this.userService.changePassword(user, changePasswordDTO);
  }

  @Patch('update-profile')
  updateProfile( @GetUser() user: User,@Body() updateProfileDTO: UpdateProfileDTO) {
    return this.userService.updateProfile(user, updateProfileDTO);
  }
>>>>>>> dc337b2690b378a0fb643c8e90f4e6fc78219ad1
}
