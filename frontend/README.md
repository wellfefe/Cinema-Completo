# Frontend Web - Admin Cinema

Painel web em React + TypeScript + Vite para administrar o sistema de cinema.

## Recursos

- CRUD de cinemas.
- CRUD de salas.
- CRUD de filmes.
- CRUD de sessoes.
- CRUD de ingressos.
- CRUD de combos de lanches.
- CRUD de pedidos.
- Cadastro de filme com URL de imagem/poster.
- Listagem de filmes usando dados reais da API.
- Mensagens de sucesso e erro com toast.

## Rodar localmente

```powershell
cd C:\Users\Cient\Desktop\Projetos\CINEMA-PROJETO\frontend
npm install
npm run dev
```

Frontend:

```txt
http://localhost:5173
```

Backend necessario:

```txt
http://localhost:3000
```

## Cadastrar filme com imagem

Na tela `Filmes`, preencha o campo:

```txt
URL da imagem / poster
```

Exemplo:

```txt
https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg
```

Ao cadastrar, o frontend envia `posterUrl` para o backend. O campo fica salvo no banco e aparece tambem no app mobile.

## Scripts

```powershell
npm run dev
npm run build
npm run preview
```

## Tecnologias

- React
- TypeScript
- Vite
- Axios
- React Router DOM
- Bootstrap
- Bootstrap Icons
- React Toastify
