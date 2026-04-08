import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLancheComboDto {
  @IsString()
  nome: string;

  @IsNumber()
  valorUnitario: number;

  @IsInt()
  qtdUnidade: number;

  @IsNumber()
  subtotal: number;

  @IsInt()
  @IsOptional()
  pedidoId?: number;
}