const mongoose = require('mongoose');

// u) Criar schema
const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true 
    },
    senha: { 
        type: String, 
        required: true 
    }
});

// v) Exportar modelo
module.exports = mongoose.model('Usuario', userSchema);