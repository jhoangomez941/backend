const mongoose = require('mongoose');

const senalECGSchema = new mongoose.Schema({
    // Relación: ¿De qué paciente es este examen?
    usuario_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: [true, "La sesión debe pertenecer a un paciente"] 
    },
    // Relación: ¿Qué placa de hardware hizo la lectura?
    dispositivo_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DispositivoECG' 
    },
    datos_grafica:{
        type: String,
    
    },
    datos_derivados:{
        type: String
    },
    fechaRegistro: {
    type: Date,
    default: Date.now
    }
});

const SenalECG = mongoose.model('SenalECG', senalECGSchema);

module.exports = SenalECG;