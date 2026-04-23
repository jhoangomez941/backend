const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del cliente es obligatorio"],
        trim: true
    },
    tipo: {
        type: String,
        required: [true, "El tipo es obligatorio"],
        enum: ["doctor", "clinica", "empresa"], // Validamos que solo sean estas 3 opciones
        default: "clinica"
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;