import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLancheComboDto } from './dto/create-lanche-combo.dto';
import { UpdateLancheComboDto } from './dto/update-lanche-combo.dto';

@Injectable()
export class LancheComboService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLancheComboDto: CreateLancheComboDto) {
    return this.prisma.lancheCombo.create({
      data: createLancheComboDto,
      include: {
        pedido: true,
      },
    });
  }

  findAll() {
    return this.prisma.lancheCombo.findMany({
      include: {
        pedido: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.lancheCombo.findUnique({
      where: { id },
      include: {
        pedido: true,
      },
    });
  }

  update(id: number, updateLancheComboDto: UpdateLancheComboDto) {
    return this.prisma.lancheCombo.update({
      where: { id },
      data: updateLancheComboDto,
      include: {
        pedido: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.lancheCombo.delete({
      where: { id },
      include: {
        pedido: true,
      },
    });
  }
}