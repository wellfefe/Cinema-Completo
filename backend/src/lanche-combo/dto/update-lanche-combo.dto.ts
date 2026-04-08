import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLancheComboDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsNumber()
  @IsOptional()
  valorUnitario?: number;

  @IsInt()
  @IsOptional()
  qtdUnidade?: number;

  @IsNumber()
  @IsOptional()
  subtotal?: number;

  @IsInt()
  @IsOptional()
  pedidoId?: number;
}