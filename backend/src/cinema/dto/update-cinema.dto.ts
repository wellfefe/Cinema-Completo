import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCinemaDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  nome?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  endereco?: string;
}