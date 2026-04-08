import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateIngressoDto {
  @IsNumber()
  valorInteira: number;

  @IsNumber()
  valorMeia: number;

  @IsInt()
  sessaoId: number;

  @IsInt()
  @IsOptional()
  pedidoId?: number;
}