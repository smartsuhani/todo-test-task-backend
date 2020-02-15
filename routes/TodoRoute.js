const { Router } = require('express');

const router = Router();

const { getList, create,deleteAll, getTodo } = require('../controllers/todosController');

router.get('/', getList);
router.post('/', create);
router.delete('/',deleteAll);
router.get('/:todo', getTodo);

module.exports = router;
