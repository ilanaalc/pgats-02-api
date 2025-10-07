# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários. O objetivo é servir de base para estudos de testes e automação de APIs.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)
- Banco de dados em memória (variáveis)

## Instalação

1. Clone o repositório:
   ```sh
   git clone <repo-url>
   cd pgats-02-api
   ```
2. Instale as dependências:
   ```sh
   npm install express swagger-ui-express bcryptjs
   ```

## Configuração

Antes de seguir, crie um arquivo .env na pasta raiz contendo as propriedades BASE_URL_REST E BASE_URL_GRAPHQL, com a URL desses serviços.

## Como rodar

- Para iniciar o servidor:
  ```sh
  node server.js
  ```
- A API estará disponível em `http://localhost:3000`
- A documentação Swagger estará em `http://localhost:3000/api-docs`

## Endpoints principais

### Registro de usuário
- `POST /users/register`
  - Body: `{ "username": "string", "password": "string", "favorecidos": ["string"] }`

### Login
- `POST /users/login`
  - Body: `{ "username": "string", "password": "string" }`

### Listar usuários
- `GET /users`

### Transferências
- `POST /transfers`
  - Body: `{ "from": "string", "to": "string", "value": number }`
- `GET /transfers`

### GraphQL Types, Queries e Mutations

Rode `npm run start-graphql` para executar a API do GraphQL e acesse a URL http://localhost:4000/graphql para acessá-la.

- **Types:**
  - `User`: username, favorecidos, saldo
  - `Transfer`: from, to, value, date
- **Queries:**
  - `users`: lista todos os usuários
  - `transfers`: lista todas as transferências (requer autenticação JWT)
- **Mutations:**
  - `registerUser(username, password, favorecidos)`: retorna User
  - `loginUser(username, password)`: retorna token + User
  - `createTransfer(from, to, value)`: retorna Transfer (requer autenticação JWT)

## Regras de negócio
- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
- O saldo inicial de cada usuário é de R$ 10.000,00.

## Testes
- O arquivo `app.js` pode ser importado em ferramentas de teste como Supertest.
- Para testar a API GraphQL, importe `graphql/app.js` nos testes.

Para dúvidas, consulte a documentação Swagger, GraphQL Playground ou o código-fonte.
---

# 🔍 pgats-02-api - Testes de API e Performance

## 🤖 Testes de API e Performance

Esta seção descreve a estrutura, as tecnologias e o modo de execução dos testes da API Rest (Supertest) e de performance (k6) adicionados a este repositório.

---

### Introdução dos Testes

Este projeto contém um conjunto de testes de **API REST** utilizando a biblioteca **Supertest** e testes de **Performance** com o **k6**. O objetivo é realizar testes funcionais da API e também não funcionais sob diferentes cargas. A estrutura de testes foi implementada como um incremento (*fork*) a uma API Node.js já existente.

---

### 💻 Tecnologias Utilizadas

| Categoria | Tecnologia | Uso |
| :--- | :--- | :--- |
| Teste Funcional | **Supertest** | Execução de requisições HTTP e validação de *endpoints* da API. |
| Teste de Performance | **k6 (Javascript)** | Simulação de carga para avaliação de desempenho da API. |
| Auxiliares | **Dotenv** | Gerenciamento de variáveis de ambiente. |

---

### 📂 Estrutura de Pastas e Objetivo dos Arquivos

A seguir, a descrição das pastas adicionadas para a execução dos testes:

| Pasta | Objetivo Principal |
| :--- | :--- |
| **`config`** | Arquivo de configuração de variáveis de ambiente para o k6. |
| **`fixtures`** | Contém **dados estáticos** (*payloads*, dados de entrada, massas de teste) necessários para os testes de API. |
| **`helpers`** | Contém **funções reutilizáveis** que simplificam a escrita dos testes, como a função de realizar login. |
| **`test`** | Contém os **testes funcionais da API** escritos com **Supertest**. |
| **`performance-tests`** | Contém os **scripts de teste de performance** escritos em JavaScript para o **k6**. |
| **`utils`** | Armazenar **utilitários gerais** que podem ser usados por diversas partes do projeto. |

---

### 🛠️ Instalação e Configuração

#### Pré-requisitos
Certifique-se de ter o **Node.js**, **npm** e o **k6** instalados em sua máquina.
Caso não esteja, siga as instruções em: <https://k6.io/docs/get-started/installation/>

#### 1. Clonar o Repositório
```bash
git clone https://github.com/ilanaalc/pgats-02-api.git
cd pgats-02-api

```

---

## 2. Instalar as Dependências

```bash
npm install
```

---

## 3. Configurar Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto e adicione a variável `BASE_URL` que será usada pelo **Supertest**:

```env
BASE_URL="http://localhost:3000" 
```

---

## 🚀 Execução dos Testes

### 1. Execução dos Testes Funcionais (Supertest)

Para executar os testes de API, use o comando `npm test`.  
Certifique-se de que a API de destino esteja em execução e a variável `BASE_URL` esteja configurada no arquivo `.env`.

```bash
npm test
```

---

### 2. Execução dos Testes de Performance (k6)

O **k6** requer que a variável de ambiente `BASE_URL` seja passada no comando para saber qual API testar.

**Exemplo de execução básica:**

```bash
k6 run performance-tests/nome_do_teste.test.js -e BASE_URL=http://localhost:3000
```

---

### 3. Execução do k6 com Relatório em Tempo Real e Exportação

Para monitorar o desempenho em um **dashboard web em tempo real** e exportar um **relatório HTML** automaticamente, utilize as variáveis de ambiente do próprio k6 conforme o exemplo:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run performance-tests/nome_do_teste.test.js -e BASE_URL=http://localhost:3000
```

