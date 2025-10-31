const express = require('express');
const { verificarToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', verificarToken, (req, res) => {
  return res.json([]);
});

module.exports = router;