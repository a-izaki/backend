const express = require('express');
const YAML = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');

//Carrega o arquivo swagger
const file = fs.readFileSync('./swagger.yaml', 'utf8');

// Valida o arquivo
const swaggerDocument = YAML.parse(file);
const router = express.Router();
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;