const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,      
    },
});

module.exports = mongoose.model('Usuario', schema);