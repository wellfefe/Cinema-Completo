# Cinema Mobile

Aplicativo mobile Expo para compra de ingressos de cinema.

## Fluxos implementados

- Login, cadastro, recuperacao de senha e logout.
- Persistencia de sessao com `expo-secure-store`.
- Listagem de filmes com fallback local caso a API nao responda.
- Listagem de sessoes por filme.
- Escolha visual de assentos livres, ocupados e selecionados.
- Selecao de combos de lanches.
- Pagamento simulado.
- Emissao de comprovante com QR Code.
- Tela "Meus ingressos" com leitura offline.
- SQLite local com status de sincronizacao.
- Sync automatico quando a internet volta.

## Rodar o app

```bash
cd mobile
npm install
npm start
```

Se estiver testando no celular fisico, configure a API:

```bash
$env:EXPO_PUBLIC_API_URL="http://SEU_IP_LOCAL:3000"
npm start
```

No Windows PowerShell, descubra seu IP com:

```bash
ipconfig
```

## Rodar testes

```bash
cd mobile
npm test
npm run typecheck
```

## Login de apresentacao

O app aceita o login abaixo mesmo se o backend ainda nao tiver JWT:

```txt
E-mail: aluno@cinema.com
Senha: 123456
```

Isso permite apresentar o fluxo completo enquanto o backend evolui para autenticacao real.

## Integracao com backend existente

O mobile tenta consumir os endpoints atuais:

- `GET /filme`
- `GET /sessao`
- `GET /lanche-combo`
- `POST /pedido`

Para uma versao 100% producao, os proximos endpoints recomendados sao:

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `GET /auth/me`
- `POST /auth/refresh`
- `GET /filme/:id/sessoes`
- `GET /sessao/:id/assentos`
- `POST /pedido` com assentos, localId, formaPagamento e dados de sync

## Pontos para apresentar ao professor

- Arquitetura separada por responsabilidades: API, contexts, database, hooks, screens, services, store e types.
- JWT preparado com Secure Store.
- Compra salva localmente em SQLite.
- Offline-first para ingressos ja comprados.
- Sincronizacao pendente usando `localId` para evitar duplicidade.
- Regras de negocio testaveis sem depender da interface.
