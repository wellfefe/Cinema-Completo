# Cinema Mobile

Aplicativo mobile Expo para clientes comprarem ingressos de cinema.

## Fluxos implementados

- Login, cadastro, recuperacao de senha e logout.
- JWT salvo com `expo-secure-store` no app nativo.
- Fallback em `localStorage` quando roda no navegador.
- Listagem de filmes vinda do backend.
- Imagem do filme carregada por `posterUrl` salvo no banco.
- Fallback local de filmes caso a API esteja fora do ar.
- Listagem de sessoes por filme.
- Escolha visual de assentos livres, ocupados e selecionados.
- Selecao de combos de lanches.
- Pagamento simulado.
- Emissao de comprovante com QR Code.
- Tela "Meus ingressos" com leitura offline.
- SQLite local para ingressos comprados.
- Status de sincronizacao: `pending_sync` e `synced`.
- Sync automatico quando a internet volta.

## Rodar o app

```powershell
cd C:\Users\Cient\Desktop\Projetos\CINEMA-PROJETO\mobile
npm install
npm start
```

## Rodar no celular fisico

O celular nao acessa `localhost` do computador. Use o IP local da maquina.

Exemplo:

```powershell
$env:EXPO_PUBLIC_API_URL="http://192.168.1.181:3000"
npm start -- --clear
```

Depois escaneie o QR Code no Expo Go.

Para descobrir o IP no Windows:

```powershell
ipconfig
```

Procure o `IPv4` da rede Wi-Fi.

## Rodar no navegador

```powershell
npm start
```

Depois pressione `w` no terminal do Expo.

Web:

```txt
http://localhost:8081
```

## Backend necessario

```txt
http://localhost:3000
```

No celular fisico, substitua `localhost` pelo IP do computador.

## Login de apresentacao

Usuario inicial:

```txt
E-mail: aluno@cinema.com
Senha: 123456
```

Tambem e possivel cadastrar novos usuarios pelo app.

## Recuperacao de senha

O fluxo usa:

- `POST /auth/forgot-password`
- `POST /auth/reset-password`

Depois de enviar o e-mail, o app mostra a area para informar codigo, nova senha e confirmacao.

Regras:

- Codigo incorreto mostra mensagem de erro.
- Botao "Nao recebi o codigo" libera reenvio apos 45 segundos.
- Nova senha igual a anterior mostra mensagem especifica.

## Integracao com backend

Endpoints consumidos:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/me`
- `GET /filme`
- `GET /sessao`
- `GET /lanche-combo`
- `POST /pedido`

## Rodar verificacoes

```powershell
cd mobile
npm run typecheck
npm test
```

## Pontos para apresentar ao professor

- Arquitetura separada por responsabilidades: API, contexts, database, hooks, navigation, screens, services, store e types.
- JWT persistido com Secure Store.
- Filme cadastrado no frontend aparece no mobile porque ambos consomem o mesmo backend.
- Poster do filme vem do banco pelo campo `posterUrl`.
- Compra salva localmente em SQLite.
- Offline-first para ingressos ja comprados.
- Sincronizacao pendente usando `localId` para evitar duplicidade.
- Regras de negocio testadas com Vitest.
