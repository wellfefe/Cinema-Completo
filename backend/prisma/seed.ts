import 'dotenv/config';
import { PrismaClient, Genero } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL nao foi carregada do arquivo .env');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  const filmesCount = await prisma.filme.count();

  if (filmesCount > 0) {
    console.log('Seed ignorado: o banco ja possui filmes cadastrados.');
    return;
  }

  const cinema = await prisma.cinema.create({
    data: {
      nome: 'Cine Dev Quest',
      endereco: 'Av. Principal, 1000 - Centro',
    },
  });

  const [sala1, sala2, salaVip] = await Promise.all([
    prisma.sala.create({
      data: {
        numero: 1,
        capacidade: 48,
        cinemaId: cinema.id,
      },
    }),
    prisma.sala.create({
      data: {
        numero: 2,
        capacidade: 40,
        cinemaId: cinema.id,
      },
    }),
    prisma.sala.create({
      data: {
        numero: 3,
        capacidade: 32,
        cinemaId: cinema.id,
      },
    }),
  ]);

  const filmes = await Promise.all([
    prisma.filme.create({
      data: {
        titulo: 'Interestelar',
        sinopse:
          'Uma equipe viaja por um buraco de minhoca em busca de um novo lar para a humanidade.',
        classificacao: '10 anos',
        duracao: 169,
        elenco: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain',
        genero: Genero.FICCAO,
        dataInicioExibicao: new Date('2026-06-01T00:00:00.000Z'),
        dataFinalExibicao: new Date('2026-06-30T23:59:59.000Z'),
        cinemaId: cinema.id,
      },
    }),
    prisma.filme.create({
      data: {
        titulo: 'Divertida Mente 2',
        sinopse:
          'Riley cresce e novas emocoes chegam para reorganizar o centro de comando da sua mente.',
        classificacao: 'Livre',
        duracao: 96,
        elenco: 'Amy Poehler, Maya Hawke',
        genero: Genero.ANIMACAO,
        dataInicioExibicao: new Date('2026-06-01T00:00:00.000Z'),
        dataFinalExibicao: new Date('2026-06-30T23:59:59.000Z'),
        cinemaId: cinema.id,
      },
    }),
    prisma.filme.create({
      data: {
        titulo: 'Duna: Parte Dois',
        sinopse:
          'Paul Atreides se une aos Fremen para enfrentar a Casa Harkonnen e assumir seu destino em Arrakis.',
        classificacao: '14 anos',
        duracao: 166,
        elenco: 'Timothee Chalamet, Zendaya, Rebecca Ferguson',
        genero: Genero.FICCAO,
        dataInicioExibicao: new Date('2026-06-01T00:00:00.000Z'),
        dataFinalExibicao: new Date('2026-06-30T23:59:59.000Z'),
        cinemaId: cinema.id,
      },
    }),
  ]);

  await Promise.all([
    prisma.sessao.create({
      data: {
        horarioExibicao: new Date('2026-06-01T19:30:00.000Z'),
        cinemaId: cinema.id,
        filmeId: filmes[0].id,
        salaId: sala1.id,
      },
    }),
    prisma.sessao.create({
      data: {
        horarioExibicao: new Date('2026-06-01T21:45:00.000Z'),
        cinemaId: cinema.id,
        filmeId: filmes[0].id,
        salaId: salaVip.id,
      },
    }),
    prisma.sessao.create({
      data: {
        horarioExibicao: new Date('2026-06-02T16:00:00.000Z'),
        cinemaId: cinema.id,
        filmeId: filmes[1].id,
        salaId: sala2.id,
      },
    }),
    prisma.sessao.create({
      data: {
        horarioExibicao: new Date('2026-06-03T20:20:00.000Z'),
        cinemaId: cinema.id,
        filmeId: filmes[2].id,
        salaId: sala1.id,
      },
    }),
  ]);

  const combosCount = await prisma.lancheCombo.count();

  if (combosCount === 0) {
    await prisma.lancheCombo.createMany({
      data: [
        {
          nome: 'Pipoca pequena',
          valorUnitario: 12,
          qtdUnidade: 1,
          subtotal: 12,
        },
        {
          nome: 'Pipoca grande',
          valorUnitario: 22,
          qtdUnidade: 1,
          subtotal: 22,
        },
        {
          nome: 'Refrigerante',
          valorUnitario: 9,
          qtdUnidade: 1,
          subtotal: 9,
        },
        {
          nome: 'Combo casal',
          valorUnitario: 35,
          qtdUnidade: 1,
          subtotal: 35,
        },
        {
          nome: 'Combo familia',
          valorUnitario: 64,
          qtdUnidade: 1,
          subtotal: 64,
        },
      ],
    });
  }

  console.log('Seed concluido: cinema, salas, filmes, sessoes e combos cadastrados.');
}

main()
  .catch(error => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
