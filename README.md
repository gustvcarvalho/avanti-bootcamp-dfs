# 📦 Avanti Bootcamp - Achados e Perdidos API

Este projeto é uma API RESTful desenvolvida como parte de um bootcamp, com o objetivo de gerenciar objetos perdidos e encontrados em um ambiente como escolas, empresas ou eventos.  
Atualmente, o projeto consiste apenas no backend utilizando Node.js, Express e Prisma ORM com banco de dados PostgreSQL.

## 🚀 Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- DBeaver (como cliente de banco de dados)
- VS Code
- Nodemon (em desenvolvimento)

## 📁 Clonando o projeto

```bash
git clone https://github.com/davidbrennerm/avanti-bootcamp-dfs.git
cd avanti-bootcamp-dfs
```

### 📦 Dependências principais

| Pacote           | Descrição                                                                 |
|------------------|---------------------------------------------------------------------------|
| **express**      | Framework web leve e flexível para APIs                                   |
| **cors**         | Middleware para liberação de requisições externas (CORS)                  |
| **prisma**       | ORM moderno e eficiente para trabalhar com PostgreSQL                     |
| **@prisma/client**| Cliente Prisma gerado automaticamente com base no schema                |
| **pg**           | Driver PostgreSQL para Node.js                                            |
| **nanoid**       | Gerador de identificadores únicos curtos (código de acesso)               |

## 📦 Instalando dependências

```bash
npm install
```

## 🔐 Configuração do `.env`

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```
DATABASE_URL="postgresql://<usuario>:<senha>@localhost:5432/perdidos_encontrados_db"
```

Substitua `<usuario>` e `<senha>` pelas suas credenciais do PostgreSQL.

Exemplo realista:

```
DATABASE_URL="postgresql://postgres:root@localhost:5432/perdidos_encontrados_db"
```

## 🧱 Criando o banco de dados

Certifique-se de que o PostgreSQL está rodando e o banco `perdidos_encontrados_db` foi criado corretamente.

Você pode usar o DBeaver ou executar diretamente no terminal:

```sql
CREATE DATABASE perdidos_encontrados_db;
```

Em seguida, aplique as migrações:

```bash
npx prisma migrate dev
```

E gere o cliente Prisma:

```bash
npx prisma generate
```

## ▶️ Rodando o servidor

```bash
npm run seed
npm run dev
```

Se tudo estiver correto, você verá a seguinte mensagem:

```
Servidor rodando em http://localhost:3000
```

## 📌 Exemplos de JSON

### 👤 Usuário

```json
{
  "nome": "Thiago Oliveira",
  "email": "thiago@teste.com.br",
  "telefone": "33991122334",
  "senha": "thiagopass"
}
```

### 📦 Item

```json
{
  "nome_objeto": "Celular Motorola",
  "dataevento": "2025-04-06T15:30:00Z",
  "localizacao": "Bloco A - Corredor 2",
  "status": "perdido",
  "categoria_id": 2,
  "usuario_id": 1
}
```

## 🛠 Endpoints principais

### Usuário

- `GET /usuarios` – Lista todos os usuários
- `POST /usuarios` – Cria um novo usuário
- `PUT /usuarios/:id` – Atualiza as informações de um usuário
- `DELETE /usuarios/:id` – Deleta um usuário (e seus itens)

### Item

- `GET /itens` – Listar itens
- `GET /itens/perdidos` – Listar apenas itens com status `0`
- `GET /itens/achados` – Listar apenas itens com status `1`
- `GET /itens/codigo/:codigoacesso` – Buscar item por código
- `POST /itens` – Cadastrar item (gera código de acesso automaticamente)
- `PUT /itens/:id` – Atualiza as informações de um item pelo ID
- `PUT /itens/codigo/:codigoacesso` – Atualizar item via código de acesso
- `DELETE /itens/:id` – Deleta um item pelo ID
- `DELETE /itens/codigo/:codigoacesso` – Deleta item via código de acesso

## 👤 Desenvolvedores

- David Martins

- Eduarda Burity Gonçalves

- Gustavo Ferraz Carvalho

- Guilherme de Souza França
  
> Rotas e funcionalidades podem ser expandidas à medida que o projeto evolui.
