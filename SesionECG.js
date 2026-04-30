const mongoose = require('mongoose');

const sesionECGSchema = new mongoose.Schema({
    // Relación: ¿De qué paciente es este examen?
    usuario_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: [true, "La sesión debe pertenecer a un usuario/paciente"] 
    },
    // Relación: ¿Qué placa de hardware hizo la lectura?
    dispositivo_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DispositivoECG' 
    },
    fechaInicio: { type: Date, default: Date.now },
    fechaFin: { type: Date },
    estado: { 
        type: String, 
        enum: ["grabando", "completada", "error"], 
        default: "grabando" 
    },

    //  El núcleo: Arreglo para guardar la gráfica del ECG 
    datosSeñal: [{
        tiempoMs: Number,
        voltaje: Number
    }],

    // Arreglo para alertas automáticas del sistema (ej. Arritmia)
    alertas: [{
        tipo: String,
        descripcion: String,
        nivel: String,
        fecha: { type: Date, default: Date.now }
    }],

    // Objeto para el resultado humano
    diagnostico: {
        comentario: String,
        doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
        fecha: Date
    }
});

const SesionECG = mongoose.model('SesionECG', sesionECGSchema);

module.exports = SesionECG;