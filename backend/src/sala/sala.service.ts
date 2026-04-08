import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';

@Injectable()
export class SalaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSalaDto: CreateSalaDto) {
    return this.prisma.sala.create({
      data: createSalaDto,
      include: {
        cinema: true,
        sessoes: true,
      },
    });
  }

  findAll() {
    return this.prisma.sala.findMany({
      include: {
        cinema: true,
        sessoes: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.sala.findUnique({
      where: { id },
      include: {
        cinema: true,
        sessoes: true,
      },
    });
  }

  update(id: number, updateSalaDto: UpdateSalaDto) {
    return this.prisma.sala.update({
      where: { id },
      data: updateSalaDto,
      include: {
        cinema: true,
        sessoes: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.sala.delete({
      where: { id },
      include: {
        cinema: true,
        sessoes: true,
      },
    });
  }
}