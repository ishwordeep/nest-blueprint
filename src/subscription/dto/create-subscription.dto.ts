import { IsString, IsNotEmpty, IsDate, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  package_id: string;

  @IsDate()
  @Type(() => Date)
  start_date: Date;

  @IsNumber()
  price: number;

  @IsDate()
  @Type(() => Date)
  end_date: Date;

  @IsBoolean()
  @IsNotEmpty()
  is_active: boolean;
}
