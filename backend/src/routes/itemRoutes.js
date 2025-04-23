const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.listarItens);
router.get('/perdidos', itemController.listarItensPerdidos);
router.get('/achados', itemController.listarItensAchados);
router.get('/codigo/:codigoacesso', itemController.listarItemPorCodigo);
router.post('/', itemController.cadastrarItem);
router.put('/:id', itemController.atualizarItem);
router.put('/codigo/:codigoacesso', itemController.atualizarItemPorCodigo);
router.delete('/:id', itemController.excluirItem);
router.delete('/codigo/:codigoacesso', itemController.excluirItemPorCodigo);

module.exports = router;