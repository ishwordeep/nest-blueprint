import { IsString, MinLength } from "class-validator";

export class ChangePasswordDTO {
    @IsString()
    old_password: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    new_password: string;

    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    confirm_password: string;

}