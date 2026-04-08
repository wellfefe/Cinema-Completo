import { IsInt, IsNumber } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  qInteira: number;

  @IsInt()
  qMeia: number;

  @IsNumber()
  valorTotal: number;
}