import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';

@Injectable()
export class IngressoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createIngressoDto: CreateIngressoDto) {
    return this.prisma.ingresso.create({
      data: createIngressoDto,
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
            cinema: true,
          },
        },
        pedido: true,
      },
    });
  }

  findAll() {
    return this.prisma.ingresso.findMany({
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
            cinema: true,
          },
        },
        pedido: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.ingresso.findUnique({
      where: { id },
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
            cinema: true,
          },
        },
        pedido: true,
      },
    });
  }

  update(id: number, updateIngressoDto: UpdateIngressoDto) {
    return this.prisma.ingresso.update({
      where: { id },
      data: updateIngressoDto,
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
            cinema: true,
          },
        },
        pedido: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.ingresso.delete({
      where: { id },
      include: {
        sessao: {
          include: {
            filme: true,
            sala: true,
            cinema: true,
          },
        },
        pedido: true,
      },
    });
  }
}