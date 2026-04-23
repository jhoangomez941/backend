const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true,
        lowercase: true,
        trim: true
    },
    clave: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"]          
    },
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
        enum: ["admin", "usuario", "editor"],
        default: "usuario"
    },
    telefono: {
        type: String
    },

    cliente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;