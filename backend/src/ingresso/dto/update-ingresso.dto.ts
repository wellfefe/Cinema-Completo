import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateIngressoDto {
  @IsNumber()
  @IsOptional()
  valorInteira?: number;

  @IsNumber()
  @IsOptional()
  valorMeia?: number;

  @IsInt()
  @IsOptional()
  sessaoId?: number;

  @IsInt()
  @IsOptional()
  pedidoId?: number;
}