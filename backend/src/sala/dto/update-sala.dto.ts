import { IsInt, IsOptional } from 'class-validator';

export class UpdateSalaDto {
  @IsInt()
  @IsOptional()
  numero?: number;

  @IsInt()
  @IsOptional()
  capacidade?: number;

  @IsInt()
  @IsOptional()
  cinemaId?: number;
}