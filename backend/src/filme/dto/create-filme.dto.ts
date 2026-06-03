import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Genero } from '@prisma/client';

export class CreateFilmeDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  sinopse: string;

  @IsString()
  @IsNotEmpty()
  classificacao: string;

  @IsInt()
  @IsNotEmpty()
  duracao: number;

  @IsString()
  @IsNotEmpty()
  elenco: string;

  @IsEnum(Genero)
  genero: Genero;

  @IsString()
  @IsOptional()
  posterUrl?: string;

  @IsDateString()
  dataInicioExibicao: string;

  @IsDateString()
  dataFinalExibicao: string;

  @IsInt()
  @IsNotEmpty()
  cinemaId: number;
}
