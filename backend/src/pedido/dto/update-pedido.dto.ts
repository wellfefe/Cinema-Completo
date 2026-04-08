import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdatePedidoDto {
  @IsInt()
  @IsOptional()
  qInteira?: number;

  @IsInt()
  @IsOptional()
  qMeia?: number;

  @IsNumber()
  @IsOptional()
  valorTotal?: number;
}