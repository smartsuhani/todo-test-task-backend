const { Router } = require('express');

const router = Router();

const { getList, create } = require('../controllers/todosController');

router.get('/', getList);
router.post('/', create);

module.exports = router;
