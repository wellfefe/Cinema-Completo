import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateSalaDto {
  @IsInt()
  @IsNotEmpty()
  numero: number;

  @IsInt()
  @IsNotEmpty()
  capacidade: number;

  @IsInt()
  @IsNotEmpty()
  cinemaId: number;
}