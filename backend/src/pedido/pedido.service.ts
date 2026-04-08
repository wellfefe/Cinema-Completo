import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPedidoDto: CreatePedidoDto) {
    return this.prisma.pedido.create({
      data: createPedidoDto,
      include: {
        ingressos: true,
        lanches: true,
      },
    });
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: {
        ingressos: true,
        lanches: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: {
        ingressos: true,
        lanches: true,
      },
    });
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return this.prisma.pedido.update({
      where: { id },
      data: updatePedidoDto,
      include: {
        ingressos: true,
        lanches: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.pedido.delete({
      where: { id },
      include: {
        ingressos: true,
        lanches: true,
      },
    });
  }
}