
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
  "status": 0,
  "categoria_id": 2,
  "usuario_id": 1
}
```

## 🛠 Endpoints principais

### Usuário

- `GET /usuarios` – Lista todos os usuários
- `POST /usuarios` – Cria um novo usuário
- `PUT /usuarios/:id` – Atualiza as informações de um usuário
- `DELETE /usuarios/:id` – Deleta um usuário

### Item

- `GET /itens` – Lista todos os itens
- `POST /itens` – Cria um novo item
- `PUT /itens/:id` – Atualiza as informações de um item
- `DELETE /itens/:id` – Deleta um item

> Rotas e funcionalidades podem ser expandidas à medida que o projeto evolui.
