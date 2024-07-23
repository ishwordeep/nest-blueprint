import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateProfileDTO {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name: string;
    
    is_active: boolean;

    @IsOptional()
    @IsString()
    image: string;

}