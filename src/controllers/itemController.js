const { prisma } = require('../database/prismaClient');
const { v4: uuidv4 } = require('uuid');
const { nanoid } = require('nanoid');

module.exports = {

    async listarItens(req, res) {
        try {
            const listaDeItens = await prisma.item.findMany();
            res.json({
                status: 'sucesso',
                mensagem: 'Lista de Itens Achados e Perdidos',
                dados: listaDeItens
            });

        } catch (error) {
            console.error('Erro ao buscar itens');
            res.status(500).json({
                status: 'erro',
                mensagem: 'Erro ao buscar itens',
                detalhes: error.meta?.target || error.message
            });
        }
    },

    async listarItensPerdidos(req, res) {
        try {
            const itensPerdidos = await prisma.item.findMany({
                where: { status: 0 },
                include: {
                    usuarios: {
                        select: { nome: true, email: true }
                    },
                    categoria: {
                        select: { nome_categoria: true }
                    }
                },
                orderBy: {
                    dataevento: 'desc'
                }
            });
            res.json({
                status: 'sucesso',
                mensagem: 'Lista de Itens Perdidos',
                dados: itensPerdidos
            });

        } catch (error) {
            console.error('Erro ao buscar itens perdidos:', error);
            res.status(500).json({
                status: 'eero',
                mensagem: 'Erro interno do servidor',
                detalhes: error.meta?.target || error.message
            });
        }
    },


    async listarItensAchados(req, res) {
        try {
            const itensAchados = await prisma.item.findMany({
                where: { status: 1 },
                include: {
                    usuarios: {
                        select: { nome: true, email: true }
                    },
                    categoria: {
                        select: { nome_categoria: true }
                    }
                },
                orderBy: {
                    dataevento: 'desc'
                }
            });
            res.json({
                status: 'sucesso',
                mensagem: 'Lista de Itens Achados',
                dados: itensAchados
            });
        } catch (error) {
            console.error('Erro ao buscar itens perdidos:', error);
            res.status(500).json({
                status: 'erro',
                mensagem: 'Erro interno do servidor',
                detalhes: error.meta?.target || error.message
            });
        }
    },


    async listarItemPorCodigo(req, res) {
        const { codigoacesso } = req.params;

        try {
            const itemCodigo = await prisma.item.findUnique({
                where: { codigoacesso },
                include: {
                    usuarios: {
                        select: {
                            nome: true,
                            email: true
                        }
                    },
                    categoria: {
                        select: {
                            nome_categoria: true
                        }
                    }
                }
            });

            if (!itemCodigo) {
                return res.status(404).json({
                    status: 'erro',
                    mensagem: 'Item não encontrado com esse código de acesso'
                });
            }
            res.status(200).json({
                status: 'sucesso',
                mensagem: 'Item encontrado!',
                dados: itemCodigo
            });

        } catch (error) {
            console.error('Erro ao buscar item por código de acesso:', error);
            res.status(500).json({
                status: 'erro',
                mensagem: 'Erro interno ao buscar item pelo código de acesso',
                detalhes: error.meta?.target || error.message
            });
        }
    },


    async cadastrarItem(req, res) {
        const {
            nome_objeto, dataevento, localizacao, status, categoria_id, usuario_id } = req.body;

        try {
            const codigo = nanoid(8);
            const novoItem = await prisma.item.create({
                data: {
                    nome_objeto,
                    dataevento: new Date(dataevento),
                    localizacao,
                    status,
                    codigoacesso: codigo,
                    categoria_id,
                    usuario_id
                }
            });

            res.status(201).json({
                status: 'sucesso',
                mensagem: 'Item cadastrado com sucesso!',
                codigoacesso: codigo,
                dados: novoItem
            });

        } catch (error) {
            console.error('Erro ao cadastrar item:', error);
            res.status(500).json({
                status: 'erro',
                mensagem: 'Erro ao cadastrar item',
                detalhes: error.meta?.target || error.message
            })
        }
    },

    async atualizarItem(req, res) {
        const { id } = req.params;
        const { nome_objeto, dataevento, localizacao, status } = req.body

        if (!nome_objeto || !dataevento || !localizacao || typeof status === 'undefined') {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        try {
            const itemAtualizado = await prisma.item.update({
                where: { id: Number(id) },
                data: {
                    nome_objeto,
                    dataevento,
                    localizacao,
                    status
                }
            });

            res.status(200).json({
                status: 'sucesso',
                mensagem: 'Item atualziado com sucesso',
                dados: itemAtualizado
            });

        } catch (error) {
            console.error('Erro ao atualizar item');
            res.status(404).json({
                status: 'erro',
                mensagem: 'Erro ao atualizar item',
                detalhes: error.meta?.target || error.message
            })
        }
    },

    async atualizarItemPorCodigo(req, res) {
        const { codigoacesso } = req.params;
        const { nome_objeto, dataevento, localizacao, status } = req.body

        if (!nome_objeto || !dataevento || !localizacao || typeof status === 'undefined') {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        try {
            const itemAtualizadoCodigo = await prisma.item.update({
                where: { codigoacesso },
                data: {
                    nome_objeto,
                    dataevento,
                    localizacao,
                    status
                }
            });

            res.status(200).json({
                status: 'sucesso',
                mensagem: 'Item atualziado via código de acesso',
                dados: itemAtualizadoCodigo
            });

        } catch (error) {
            console.error('Erro ao atualizar item via código de acesso');
            res.status(404).json({
                status: 'erro',
                mensagem: 'Erro ao atualizar item via código de acesso',
                detalhes: error.meta?.target || error.message
            })
        }
    },


    async excluirItem(req, res) {
        const { id } = req.params

        try {
            const itemExcluido = await prisma.item.delete({
                where: { id: Number(id) }
            });
            return res.status(200).json({
                status: 'sucesso',
                mensagem: 'Item excluído com sucesso!',
                dados: itemExcluido
            });

        } catch (error) {
            console.error('Erro ao excluir item', error);
            return res.status(404).json({
                status: 'erro',
                mensagem: 'Erro ao excluir item',
                detalhes: error.meta?.target || error.message
            });
        }
    },

    async excluirItemPorCodigo(req, res) {
        const { codigoacesso } = req.params;

        try {
            const itemExcluidoCodigo = await prisma.item.delete({
                where: { codigoacesso }
            });

            return res.status(200).json({
                status: 'sucesso',
                mensagem: 'Item excluído via código de acesso',
                dados: itemExcluidoCodigo
            });
        } catch (error) {
            console.error('Erro ao excluir item por código de acesso:', error);
            return res.status(404).json({
                status: 'erro',
                mensagem: 'Item não encontrado com este código de acesso',
                detalhes: error.meta?.target || error.message
            });
        }
    }
}