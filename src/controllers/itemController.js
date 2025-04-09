const {PrismaClient} = require('@prisma/client');
const {v4: uuidv4} = require('uuid');
const {nanoid} = require('nanoid');
const prisma = new PrismaClient();

module.exports = {

    async listarItens (req, res) {
        try {
            const itens = await prisma.item.findMany();
            res.json(itens);
        } catch (error) {
            console.error('Erro ao buscar produtos');
            res.status(500).json({error: 'Erro ao buscar produtos'});
    
        }
    },
    
    async listarItensPerdidos (req, res) {
        try {
            const itens = await prisma.item.findMany({
                where: { status: 0},
                include: {
                    usuarios: {
                        select: {nome: true, email: true}
                    },
                    categoria: {
                        select: {nome_categoria: true}
                    }
                },
                orderBy: {
                    dataevento: 'desc'
                }
            });
            res.json(itens);
        } catch (error) {
            console.error('Erro ao buscar itens perdidos:', error);
            res.status(500).json({erro: 'Erro interno do servidor'});
        }
    },
    
    
    async listarItensAchados(req, res) {
        try {
            const itens = await prisma.item.findMany({
                where: { status: 1},
                include: {
                    usuarios: {
                        select: {nome: true, email: true}
                    },
                    categoria: {
                        select: {nome_categoria: true}
                    }
                },
                orderBy: {
                    dataevento: 'desc'
                }
            });
            res.json(itens);
        } catch (error) {
            console.error('Erro ao buscar itens perdidos:', error);
            res.status(500).json({erro: 'Erro interno do servidor'});
        }
    },
    
    
    async listarItemPorCodigo (req, res) {
        const { codigoacesso } = req.params;
      
        try {
          const item = await prisma.item.findUnique({
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
      
          if (!item) {
            return res.status(404).json({ error: 'Item não encontrado com este código de acesso' });
          }
      
          res.status(200).json(item);
        } catch (error) {
          console.error('Erro ao buscar item por código de acesso:', error);
          res.status(500).json({ error: 'Erro interno ao buscar item' });
        }
      },
      
    
    async cadastrarItem (req, res) {
        const {
            nome_objeto,dataevento,localizacao,status,categoria_id,usuario_id} = req.body;
    
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
                mensagem: 'Item cadastrado com sucesso!',
                codigoacesso: codigo,
                item: novoItem
            });
        }catch (error) {
            console.error('Erro ao cadastrar item:', error);
            res.status(500).json({error: 'Erro ao cadastrar item'})
        }
    },
    
    async atualizarItem (req, res) {
        const{id} = req.params;
        const {nome_objeto, dataevento, localizacao, status} = req.body
    
        if (!nome_objeto || !dataevento || !localizacao || typeof status === 'undefined') {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
    
        try {
            const itemAtualizado = await prisma.item.update ({
                where: {id: Number(id)},
                data: {
                    nome_objeto,
                    dataevento,
                    localizacao,
                    status
                }
            });
    
            res.status(200).json(itemAtualizado)
        }catch (error) {
            console.error('Erro ao atualizar item');
            res.status(404).json({error: 'Erro ao atualizar item'})
        }
    },
    
    async atualizarItemPorCodigo (req, res) {
        const{codigoacesso} = req.params;
        const {nome_objeto, dataevento, localizacao, status} = req.body
    
        if (!nome_objeto || !dataevento || !localizacao || typeof status === 'undefined') {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
    
        try {
            const itemAtualizado = await prisma.item.update ({
                where: {codigoacesso},
                data: {
                    nome_objeto,
                    dataevento,
                    localizacao,
                    status
                }
            });
    
            res.status(200).json(itemAtualizado)
        }catch (error) {
            console.error('Erro ao atualizar item via código de acesso');
            res.status(404).json({error: 'Erro ao atualizar item via código de acesso'})
        }
    },
    
    
    async excluirItem(req, res) {
        const {id} = req.params
        
        try {
            const itemExcluido = await prisma.item.delete ({
                where: {id: Number(id)}
            });
            return res.status(200).json({
                mensagem: 'Item excluído com sucesso!',
                item: itemExcluido
            })
        } catch (error) {
            console.error('Erro ao excluir item', error);
            return res.status(404).json({error: 'Erro ao excluir item'});
        }
    },
    
    async excluirItemPorCodigo (req, res) {
        const {codigoacesso} = req.params;
    
        try {
            const itemExcluido = await prisma.item.delete({
                where: {codigoacesso}
            });
    
            return res.status(200).json({
                mensagem: 'Item excluído com sucesso!',
                item: itemExcluido
            });
        } catch (error) {
            console.error('Erro ao excluir item por código de acesso:', error);
            return res.status(404).json({ error: 'Item não encontrado com este código de acesso' });
        }
    },
    

};