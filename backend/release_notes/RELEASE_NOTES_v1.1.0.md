# 📦 Release Notes — Achados e Perdidos API

**Versão:** 1.1.0  
**Data:** 14 de abril de 2025

---

## ✨ Novidades

- ✅ Suporte a atualização parcial de dados (`PATCH-style`) para usuários e itens.  
- ✅ A API agora aceita `status` como string: `"perdido"` ou `"encontrado"`.  
- ✅ Código de acesso gerado automaticamente com `nanoid(8)` e retornado no cadastro de item.  
- ✅ Novo endpoint `GET /itens` com filtros combinados:  
  `GET /itens?status=&categoria_id=&localizacao=`  
- ✅ Mensagens padronizadas de resposta da API.  
- ✅ Validação de dados de entrada em todos os métodos.

---

## 🛠️ Correções

- 🐛 Corrigido bug com valores *falsy* que impedia o cadastro de itens.  
- 🐛 Corrigido problema de rotas sobrepostas.  
- 🐛 Corrigido erro "Cannot PUT" causado por ausência de rota correspondente.
