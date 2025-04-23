# 📦 Release Notes - Achados e Perdidos API

## Versão: 1.2.0
📅 Data: 16 de abril 2025

---

## ✨ Novidades

- ✅ Implementado script de seed (`prisma/seed.js`) para inserir categorias iniciais no banco
- ✅ Lista de categorias ampliada para 20 opções + categoria "outros"
- ✅ Seed usa `upsert`, evitando duplicações e podendo ser rodado quantas vezes for necessário
- ✅ Integração do `seed.js` com instância Prisma compartilhada (`prismaClient.js`)
- ✅ Novo comando no `package.json`: `npm run seed`

---

## 🛠️ Correções e ajustes

- 🧹 Refatorado `seed.js` para usar a instância Prisma centralizada do projeto
- ⚠️ Criado comando SQL para limpeza segura da tabela `item` antes de redefinir categorias

