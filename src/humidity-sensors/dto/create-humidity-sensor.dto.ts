import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHumiditySensorDto {
  @IsNotEmpty()
  @IsString()
  sensorName: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsOptional()
  timestamp?: Date;
}
