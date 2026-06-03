# Backend - API Cinema

API REST em NestJS para o sistema de cinema.

## Principais recursos

- CRUD de cinema, sala, filme, sessao, ingresso, lanche combo e pedido.
- Autenticacao JWT.
- Cadastro e login de usuarios.
- Recuperacao e redefinicao de senha.
- Envio real de e-mail com Nodemailer.
- Swagger com autorizacao Bearer JWT.
- Prisma ORM com PostgreSQL.
- Seed para dados iniciais de apresentacao.
- Campo `posterUrl` em filme para exibir imagem no frontend e no mobile.

## Rodar localmente

```powershell
cd C:\Users\Cient\Desktop\Projetos\CINEMA-PROJETO\backend
npm install
npm run start:dev
```

API:

```txt
http://localhost:3000
```

Swagger:

```txt
http://localhost:3000/api
```

## Banco de dados

O projeto usa PostgreSQL.

Configure `backend/.env`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/crud_cinema"
JWT_SECRET="troque-este-segredo"
```

Aplicar migrations:

```powershell
npx prisma migrate dev
```

Gerar Prisma Client:

```powershell
npx prisma generate
```

Rodar seed:

```powershell
npm run seed
```

Abrir Prisma Studio:

```powershell
npx prisma studio
```

## Configurar envio de e-mail

Para recuperacao de senha real, configure SMTP no `.env`:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="seu-email@gmail.com"
SMTP_PASS="sua-senha-de-app"
SMTP_FROM="Cinema <seu-email@gmail.com>"
```

Para Gmail, use senha de app, nao a senha normal da conta.

## Endpoints de autenticacao

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/me`
- `GET /auth/users`
- `POST /auth/refresh`

## Usar JWT no Swagger

1. Abra `http://localhost:3000/api`.
2. Execute `POST /auth/login`.
3. Copie o `accessToken`.
4. Clique em `Authorize`.
5. Cole o token no campo `JWT-auth`.
6. Execute uma rota protegida.

## Filmes com imagem

O filme aceita `posterUrl`:

```json
{
  "titulo": "Interestelar",
  "sinopse": "Uma equipe viaja por um buraco de minhoca.",
  "classificacao": "10 anos",
  "duracao": 169,
  "elenco": "Matthew McConaughey, Anne Hathaway",
  "genero": "FICCAO",
  "posterUrl": "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  "dataInicioExibicao": "2026-06-01T00:00:00.000Z",
  "dataFinalExibicao": "2026-06-30T23:59:59.000Z",
  "cinemaId": 1
}
```

Esse campo e salvo no banco e consumido pelo frontend web e pelo app mobile.

## Scripts

```powershell
npm run start:dev
npm run build
npm run seed
npm run test
```
