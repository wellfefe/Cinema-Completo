import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Genero } from '@prisma/client';

export class UpdateFilmeDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsString()
  @IsOptional()
  sinopse?: string;

  @IsString()
  @IsOptional()
  classificacao?: string;

  @IsInt()
  @IsOptional()
  duracao?: number;

  @IsString()
  @IsOptional()
  elenco?: string;

  @IsEnum(Genero)
  @IsOptional()
  genero?: Genero;

  @IsString()
  @IsOptional()
  posterUrl?: string;

  @IsDateString()
  @IsOptional()
  dataInicioExibicao?: string;

  @IsDateString()
  @IsOptional()
  dataFinalExibicao?: string;

  @IsInt()
  @IsOptional()
  cinemaId?: number;
}
