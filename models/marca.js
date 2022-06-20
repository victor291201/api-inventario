const { Schema, model } = require('mongoose');

const MarcaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Debe colocar un nombre']
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

module.exports = model('Marca', MarcaSchema);