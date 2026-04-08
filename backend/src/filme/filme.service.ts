import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Injectable()
export class FilmeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFilmeDto: CreateFilmeDto) {
    return this.prisma.filme.create({
      data: {
        ...createFilmeDto,
        dataInicioExibicao: new Date(createFilmeDto.dataInicioExibicao),
        dataFinalExibicao: new Date(createFilmeDto.dataFinalExibicao),
      },
      include: {
        cinema: true,
        sessoes: true,
      },
    });
  }

  findAll() {
    return this.prisma.filme.findMany({
      include: {
        cinema: true,
        sessoes: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.filme.findUnique({
      where: { id },
      include: {
        cinema: true,
        sessoes: true,
      },
    });
  }

  update(id: number, updateFilmeDto: UpdateFilmeDto) {
    return this.prisma.filme.update({
      where: { id },
      data: {
        ...updateFilmeDto,
        ...(updateFilmeDto.dataInicioExibicao && {
          dataInicioExibicao: new Date(updateFilmeDto.dataInicioExibicao),
        }),
        ...(updateFilmeDto.dataFinalExibicao && {
          dataFinalExibicao: new Date(updateFilmeDto.dataFinalExibicao),
        }),
      },
      include: {
        cinema: true,
        sessoes: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.filme.delete({
      where: { id },
      include: {
        cinema: true,
        sessoes: true,
      },
    });
  }
}