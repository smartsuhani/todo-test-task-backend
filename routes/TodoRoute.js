const { Router } = require('express');

const router = Router();

const { getList, getTodo, create, updateTodo, deleteCompleted, singleDelete , deleteAll } = require('../controllers/todosController');

router.get('/', getList);
router.post('/', create);
router.delete('/',deleteAll);
router.delete('/completed',deleteCompleted);
router.get('/:todo', getTodo);
router.delete('/:todo', singleDelete);
router.patch('/:todo', updateTodo);

module.exports = router;
