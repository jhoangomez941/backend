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
        enum: ["admin", "paciente", "doctor","hospital"],
        default: "paciente"
    },
    telefono: {
        type: String,
        required: [true, "El telefono es obligatorio"],
        unique: true,
        lowercase: true,
        trim: true
    },
    codigo_activacion:{
         unique: true,
         sparse: true,
         type: String,
         lowercase: true,
         trim: true
    },
    estado:{
        type: String,
        enum:["activado" , "desactivado"],
        default: "activado"
    },

    creado_por_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }


});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;