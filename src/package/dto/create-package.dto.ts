import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreatePackageDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    no_of_download: number;

    @IsOptional()
    @IsNumber()
    no_of_query: number;

    @IsOptional()
    @IsNumber()
    no_of_history_day: number;

    @IsBoolean()
    is_active: boolean;
}
