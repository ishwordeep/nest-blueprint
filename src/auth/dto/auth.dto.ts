import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuthDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

<<<<<<< HEAD
    
=======
    @IsString()
    @IsOptional()
    image?: string;
>>>>>>> dc337b2690b378a0fb643c8e90f4e6fc78219ad1
}