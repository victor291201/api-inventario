const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Debe colocar un nombre']
    },
    email: {
        type: String,
        required: [true, 'Debe colocar un correo'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('Usuario', UsuarioSchema);