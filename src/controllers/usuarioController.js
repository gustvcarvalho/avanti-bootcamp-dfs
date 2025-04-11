const { prisma } = require('../database/prismaClient');

module.exports = {

    async listarUsuarios(req, res) {
        try {
            const usuarios = await prisma.usuarios.findMany({
                orderBy: {
                    id: 'asc'
                }
            });

            res.json({
                status: 'sucesso',
                mensagem: 'Usuários ativos',
                dados: usuarios
            });

        } catch (error) {
            console.error('Erro ao buscar usuários');
            res.status(500).json({
                status: 'error',
                mensagem: 'Erro ao buscar usuário',
                detalhes: error.meta?.target || error.message
            });
        }
    },

    async cadastrarUsuario(req, res) {
        const { nome, email, telefone, senha } = req.body;

        try {
            const novoUsuario = await prisma.usuarios.create({
                data: {
                    nome,
                    email,
                    telefone,
                    senha
                },

                select: {
                    id: true,
                    nome: true,
                    email: true,
                    telefone: true
                }
            });
            res.status(201).json({
                status: 'sucesso',
                mensagem: 'Usuário cadastrado com sucesso!',
                dados: novoUsuario
            });

        } catch (error) {
            console.error('Erro ao cadastrar novo usuário:', error);
            res.status(500).json({
                status: 'erro',
                mensagem: 'Erro ao cadastrar novo usuário ',
                detalhes: error.meta?.target || error.message
            });
        }
    },

    async atualizarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, telefone } = req.body

        try {
            const usuarioAtualizado = await prisma.usuarios.update({
                where: { id: Number(id) },
                data: {
                    nome,
                    email,
                    telefone
                },

                select: {
                    id: true,
                    nome: true,
                    email: true,
                    telefone: true
                }

            });
            return res.status(200).json({
                status: 'sucesso',
                mensagem: 'Usuarário atualizado com sucesso!',
                dados: usuarioAtualizado
            });

        } catch (error) {
            console.error('Erro ao atualizar usuário');
            res.status(500).json({
                status: 'erro',
                mensagem: 'Erro ao atualizar usuário',
                detalhes: error.meta?.target || error.message
            });
        }
    },

    async excluirUsuario(req, res) {
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
                status: 'sucesso',
                mensagem: 'Usuário e itens relacionados foram excluídos com sucesso.',
                dados: usuarioExcluido
            });

        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            return res.status(500).json({
                status: 'erro',
                mensagem: 'Erro ao excluir usuário',
                detalhes: error.meta?.target || error.message
            });

        }
    }
};