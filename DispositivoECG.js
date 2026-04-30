const mongoose = require('mongoose');

const dispositivoSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: [true, "El serial o MAC del dispositivo es obligatorio"],
        unique: true, // No pueden existir dos placas con el mismo serial
        trim: true
    },
    modelo: {
        type: String,
        required: [true, "El modelo del dispositivo es obligatorio"]
    },
    //Reemplazamos la tabla EstadoDispositivo con este enum 
    estado: {
        type: String,
        enum: ["activo", "mantenimiento", "dañado"],
        default: "activo"
    },
    // Puente hacia la clínica dueña del equipo
    cliente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        required: [true, "El dispositivo debe pertenecer a un Cliente (Clínica)"]
    },
    // Puente hacia el paciente que tiene el equipo asignado
    usuario_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

const DispositivoECG = mongoose.model('DispositivoECG', dispositivoSchema);

module.exports = DispositivoECG;