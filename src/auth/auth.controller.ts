import { Body, Controller, HttpCode, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // login
    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }


    // signup
    @Post('signup')
    @UseInterceptors(FileInterceptor('image'))
    async signup(@Body() dto: AuthDto, @UploadedFile() file: Express.Multer.File) {
        if(file){
            dto.image = file.filename;
        }
        return this.authService.signup(dto);
    }
}
