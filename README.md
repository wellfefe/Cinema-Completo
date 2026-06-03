# CineWeb + Cinema Mobile

Projeto full stack para gerenciamento de cinema e compra de ingressos, desenvolvido para apresentacao academica.

O sistema tem tres partes:

- `backend/`: API REST em NestJS, Prisma e PostgreSQL.
- `frontend/`: painel web administrativo em React + Vite.
- `mobile/`: aplicativo Expo React Native para cliente comprar ingressos.

## Funcionalidades

### Backend

- CRUD de cinemas, salas, filmes, sessoes, ingressos, combos e pedidos.
- Autenticacao com JWT.
- Cadastro, login, logout pelo app e validacao de usuario autenticado.
- Recuperacao de senha com envio real de e-mail via SMTP.
- Swagger em `http://localhost:3000/api`.
- Seed do banco com cinema, salas, filmes, sessoes e combos.
- Campo `posterUrl` no filme para salvar a imagem no banco.

### Frontend web

- Painel administrativo para cadastrar, listar, editar e excluir registros.
- Cadastro de filmes com URL da imagem/poster.
- Listagem de filmes consumindo dados do backend.
- CRUD de sessoes, salas, cinemas, pedidos, lanches e ingressos.
- Mensagens visuais de sucesso e erro.

### Mobile Expo

- Login, cadastro e recuperacao de senha.
- Persistencia de token JWT.
- Listagem de filmes vindos do backend.
- Poster do filme carregado pelo campo `posterUrl` salvo no banco.
- Listagem de sessoes.
- Escolha de assentos.
- Selecao de combos.
- Pagamento simulado.
- Emissao de comprovante com QR Code.
- Meus ingressos com funcionamento offline.
- Armazenamento local com SQLite.
- Sincronizacao automatica quando a internet volta.

## Tecnologias

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- Swagger
- Class Validator
- Nodemailer
- JWT

### Frontend

- React
- TypeScript
- Vite
- Axios
- React Router DOM
- Bootstrap
- React Toastify

### Mobile

- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- Expo Secure Store
- Expo SQLite
- NetInfo
- Zustand
- React Hook Form
- Zod
- QR Code
- Vitest

## Estrutura do projeto

```txt
CINEMA-PROJETO/
  backend/
    prisma/
    src/
      auth/
      mail/
      filme/
      sessao/
      cinema/
      sala/
      ingresso/
      lanche-combo/
      pedido/

  frontend/
    src/
      pages/
      models/
      services/

  mobile/
    src/
      api/
      components/
      contexts/
      database/
      hooks/
      navigation/
      screens/
      services/
      store/
      types/
      utils/
```

## Como rodar

### 1. Backend

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

### 2. Frontend web

```powershell
cd C:\Users\Cient\Desktop\Projetos\CINEMA-PROJETO\frontend
npm install
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

### 3. Mobile

```powershell
cd C:\Users\Cient\Desktop\Projetos\CINEMA-PROJETO\mobile
npm install
npm start
```

No celular fisico com Expo Go, o app precisa acessar o IP do computador, nao `localhost`.

Exemplo:

```powershell
$env:EXPO_PUBLIC_API_URL="http://192.168.1.181:3000"
npm start -- --clear
```

Descobrir IP no Windows:

```powershell
ipconfig
```

## Banco de dados

O projeto usa PostgreSQL com Prisma.

Banco usado localmente:

```txt
crud_cinema
```

Gerar/aplicar migrations:

```powershell
cd backend
npx prisma migrate dev
```

Rodar seed:

```powershell
cd backend
npm run seed
```

Abrir Prisma Studio:

```powershell
cd backend
npx prisma studio
```

## Variaveis de ambiente

Crie `backend/.env` baseado em `backend/.env.example`.

Exemplo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/crud_cinema"
JWT_SECRET="troque-este-segredo"

SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="seu-email@gmail.com"
SMTP_PASS="sua-senha-de-app"
SMTP_FROM="Cinema <seu-email@gmail.com>"
```

Nao suba o arquivo `.env` real para o GitHub.

## Endpoints principais

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/me`
- `GET /auth/users`
- `POST /auth/refresh`

### Cinema

- `GET /cinema`
- `POST /cinema`
- `GET /cinema/:id`
- `PATCH /cinema/:id`
- `DELETE /cinema/:id`

### Filme

- `GET /filme`
- `POST /filme`
- `GET /filme/:id`
- `PATCH /filme/:id`
- `DELETE /filme/:id`

Campo importante para imagem do filme:

```json
{
  "posterUrl": "https://image.tmdb.org/t/p/w500/exemplo.jpg"
}
```

### Sessao

- `GET /sessao`
- `POST /sessao`
- `GET /sessao/:id`
- `PATCH /sessao/:id`
- `DELETE /sessao/:id`

### Lanche Combo

- `GET /lanche-combo`
- `POST /lanche-combo`
- `GET /lanche-combo/:id`
- `PATCH /lanche-combo/:id`
- `DELETE /lanche-combo/:id`

### Pedido

- `GET /pedido`
- `POST /pedido`
- `GET /pedido/:id`
- `PATCH /pedido/:id`
- `DELETE /pedido/:id`

## JWT no Swagger

1. Abra `http://localhost:3000/api`.
2. Execute `POST /auth/login`.
3. Copie somente o valor de `accessToken`.
4. Clique em `Authorize`.
5. Cole o token no campo `JWT-auth`.
6. Teste rotas protegidas, como `GET /auth/me` ou `GET /auth/users`.

## Fluxo para demonstrar ao professor

1. Rodar backend.
2. Abrir Swagger e mostrar endpoints.
3. Rodar frontend.
4. Cadastrar um filme pelo frontend com `posterUrl`.
5. Abrir `GET /filme` no Swagger e mostrar que o filme esta no banco.
6. Rodar mobile no Expo.
7. Abrir app no celular e mostrar que o filme cadastrado aparece no app.
8. Comprar ingresso: escolher sessao, assento, combo e pagamento.
9. Mostrar comprovante e depois "Meus ingressos".
10. Explicar SQLite/offline-first e sincronizacao.

## Comandos de verificacao

Backend:

```powershell
cd backend
npm run build
```

Mobile:

```powershell
cd mobile
npm run typecheck
npm test
```

## Autor

GitHub: [@wellfefe](https://github.com/wellfefe)
