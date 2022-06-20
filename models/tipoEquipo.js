const { Schema, model } = require('mongoose');

const TipoEquipoSchema = Schema({
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
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

module.exports = model('TipoEquipo', TipoEquipoSchema);