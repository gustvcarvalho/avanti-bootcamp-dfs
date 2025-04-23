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

        if (!nome || !email || !telefone || !senha) {
            return res.status(400).json({
                status: 'erro',
                mensagem: 'Todos os campos são obrigatórios'
            })
        };

        if (!email.includes('@') || !email.includes('.')) {
            return res.status(400).json({
                status: 'erro',
                mensagem: 'Formato de e-mail inválido'
            })
        };

        if (telefone.length < 10 || telefone.length > 15) {
            return res.status(400).json({
                status: 'erro',
                mensagem: 'Formato de telefone inválido'
            })
        };

        if (senha.length < 6) {
            return res.status(400).json({
                status: 'erro',
                mensagem: 'A senha deve ter no mínimo 6 caracteres'
            })
        };

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

        const dadosAtualizacao = {};

        if (nome) dadosAtualizacao.nome = nome;
        if (email) {
            if (!email.includes('@') || !email.includes('.')) {
                return res.status(400).json({
                    status: 'erro',
                    mensagem: 'E-mail inválido'
                });
            }

            dadosAtualizacao.email = email;
        }

        if (telefone) {
            if (telefone.length < 10 || telefone.length > 15) {
                return res.status(400).json({
                    status: 'erro',
                    mensagem: 'Telefone deve ter entre 10 e 15 dígitos'
                });
            }
            dadosAtualizacao.telefone = telefone;
        }

        if (Object.keys(dadosAtualizacao).length === 0) {
            return res.status(400).json({
                status: 'erro',
                mensagem: 'Nenhum campo válido enviado para atualização'
            });
        }

        try {
            const usuarioAtualizado = await prisma.usuarios.update({
                where: { id: Number(id) },
                data: dadosAtualizacao,

                select: {
                    id: true,
                    nome: true,
                    email: true,
                    telefone: true
                }

            });
            return res.status(200).json({
                status: 'sucesso',
                mensagem: 'Usuário atualizado com sucesso!',
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