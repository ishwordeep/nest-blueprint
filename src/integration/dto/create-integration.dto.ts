import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateIntegrationDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;
}