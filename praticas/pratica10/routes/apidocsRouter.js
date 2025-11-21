const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');


// d) Crie uma instância de "File" 
const file = fs.readFileSync('./swagger.yaml', 'utf8');

// e) Crie uma instância de "SwaggerDocument"
const swaggerDoc = YAML.parse(file);

const router = express.Router();

// f) Declare um middleware de rota para a instância de "Router"
router.use('/', swaggerUi.serve);

// g) Declare um middleware de rota para a instância de "Router" 
router.get('/', swaggerUi.setup(swaggerDoc));

// h) Exporte a instância de "Router" 
module.exports = router;