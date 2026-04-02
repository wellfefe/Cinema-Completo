# CineWeb - Sistema de Gestão de Cinema

Projeto full stack para gerenciamento de cinema, desenvolvido com **NestJS + Prisma + PostgreSQL** no backend e **React + TypeScript + Vite** no frontend.

## Funcionalidades

O sistema permite realizar operações de CRUD para:

- Cinemas
- Salas
- Filmes
- Sessões
- Ingressos
- Lanches
- Pedidos

Além disso, o frontend permite:

- listar registros
- cadastrar novos registros
- editar registros
- excluir registros
- visualizar mensagens de sucesso e erro
- navegar entre as telas com menu interativo

## Tecnologias utilizadas

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- Swagger
- Class Validator

### Frontend
- React
- TypeScript
- Vite
- Axios
- React Router DOM
- Bootstrap
- Bootstrap Icons
- React Toastify

## Estrutura do projeto

```bash
CINEMA-PROJETO/
├── backend/
└── frontend/
```

## Como executar o projeto

### 1. Backend

Entre na pasta do backend:
```bash
cd backend
```
Instale as dependências:
```bash
npm install
```
Execute o projeto:
```bash
npm run start:dev
```
O backend ficará disponível em:

http://localhost:3000

Swagger:

http://localhost:3000/api

### 2. Frontend

Entre na pasta do frontend:
```bash
cd frontend
```
Instale as dependências:
```bash
npm install
```
Execute o projeto:
```bash
npm run dev
```
O frontend ficará disponível em:

http://localhost:5173

## Banco de dados

O projeto utiliza PostgreSQL com gerenciamento via Prisma.

Banco utilizado:
```bash
crud_cinema
```
Para visualizar o banco, pode ser usado o pgAdmin 4.

## Caminho no pgAdmin
- Servers
- PostgreSQL
- Databases
- crud_cinema
- Schemas
- public
- Tables
## Endpoints principais
### Cinema
- GET /cinema
- POST /cinema
- PATCH /cinema/:id
- DELETE /cinema/:id
### Sala
- GET /sala
- POST /sala
- PATCH /sala/:id
- DELETE /sala/:id
### Filme
- GET /filme
- POST /filme
- PATCH /filme/:id
- DELETE /filme/:id
### Sessão
- GET /sessao
- POST /sessao
- PATCH /sessao/:id
- DELETE /sessao/:id
### Ingresso
- GET /ingresso
- POST /ingresso
- PATCH /ingresso/:id
- DELETE /ingresso/:id
### Lanche Combo
- GET /lanche-combo
- POST /lanche-combo
- PATCH /lanche-combo/:id
- DELETE /lanche-combo/:id
### Pedido
- GET /pedido
- POST /pedido
- PATCH /pedido/:id
- DELETE /pedido/:id
## Diferenciais implementados no frontend
- integração completa com a API
- CRUD diretamente pela interface
- mensagens visuais com toast
- navegação com hover e link ativo destacado
- estrutura organizada por páginas, modelos, componentes e serviços
  
# Autor
👤 GitHub - @wellfefe   
Frontend Mentor - @wellfefe