const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {

    async listarUsuarios (req, res) {
        try {
            const usuarios = await prisma.usuarios.findMany();
            res.json(usuarios);
        }catch (error) {
            console.error('Erro ao buscar usuários');
            res.status(500).json({error: 'Erro ao buscar usuário'});
        }
    },

    async cadastrarUsuario (req, res) {
        const {nome,email,telefone,senha} = req.body;
    
        try {
            const novoUsuario = await prisma.usuarios.create({
                data: {
                    nome,
                    email,
                    telefone,
                    senha
                }
            });
            res.status(201).json(novoUsuario);
        }catch (error) {
            console.error('Erro ao cadastrar novo Usuário:', error);
            res.status(500).json({error: 'Erro ao cadastrar novo usuário'});
        }
    },

    async atualizarUsuario (req,res) {
        const {id} = req.params;
        const {nome, email, telefone} = req.body
    
        try {
           const usuarioAtualizado = await prisma.usuarios.update({
            where: {id: Number(id)},
            data: {
                nome,
                email,
                telefone
            }
           });
           return res.status(200).json(usuarioAtualizado)
        }catch (error) {
            console.error('Erro ao atualizar usuário');
            res.status(500).json({error: 'Erro ao atualizar usuário'});
        }
    },

    async excluirUsuario (req, res) {
        const { id } = req.params;
      
        try {
            
          await prisma.item.deleteMany({
            where: { usuario_id: Number(id) }
          });
      
          const usuarioExcluido = await prisma.usuarios.delete({
            where: { id: Number(id) },
            select: {
              id: true,
              nome: true,
              email: true,
              telefone: true
            }
          });
      
          return res.status(200).json({
            mensagem: 'Usuário e itens relacionados foram excluídos com sucesso.',
            usuario: usuarioExcluido
          });
        } catch (error) {
          console.error('Erro ao excluir usuário:', error);
          return res.status(500).json({ error: 'Erro ao excluir usuário' });
        }
    }
};