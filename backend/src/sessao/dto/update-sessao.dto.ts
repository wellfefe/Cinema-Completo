import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class UpdateSessaoDto {
  @IsDateString()
  @IsOptional()
  horarioExibicao?: string;

  @IsInt()
  @IsOptional()
  cinemaId?: number;

  @IsInt()
  @IsOptional()
  filmeId?: number;

  @IsInt()
  @IsOptional()
  salaId?: number;
}