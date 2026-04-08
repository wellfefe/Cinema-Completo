import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@Injectable()
export class SessaoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSessaoDto: CreateSessaoDto) {
    return this.prisma.sessao.create({
      data: {
        ...createSessaoDto,
        horarioExibicao: new Date(createSessaoDto.horarioExibicao),
      },
      include: {
        cinema: true,
        filme: true,
        sala: true,
        ingressos: true,
      },
    });
  }

  findAll() {
    return this.prisma.sessao.findMany({
      include: {
        cinema: true,
        filme: true,
        sala: true,
        ingressos: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.sessao.findUnique({
      where: { id },
      include: {
        cinema: true,
        filme: true,
        sala: true,
        ingressos: true,
      },
    });
  }

  update(id: number, updateSessaoDto: UpdateSessaoDto) {
    return this.prisma.sessao.update({
      where: { id },
      data: {
        ...updateSessaoDto,
        ...(updateSessaoDto.horarioExibicao && {
          horarioExibicao: new Date(updateSessaoDto.horarioExibicao),
        }),
      },
      include: {
        cinema: true,
        filme: true,
        sala: true,
        ingressos: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.sessao.delete({
      where: { id },
      include: {
        cinema: true,
        filme: true,
        sala: true,
        ingressos: true,
      },
    });
  }
}