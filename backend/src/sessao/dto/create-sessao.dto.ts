import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSessaoDto {
  @IsDateString()
  @IsNotEmpty()
  horarioExibicao: string;

  @IsInt()
  @IsNotEmpty()
  cinemaId: number;

  @IsInt()
  @IsNotEmpty()
  filmeId: number;

  @IsInt()
  @IsNotEmpty()
  salaId: number;
}