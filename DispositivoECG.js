const mongoose = require('mongoose');

const dispositivoSchema = new mongoose.Schema({
    serial: {
        type: String,
        required: [true, "El serial  del dispositivo es obligatorio"],
        unique: true, // No pueden existir dos placas con el mismo serial
        trim: true
    },

    //Reemplazamos la tabla EstadoDispositivo con este enum 
    estado: {
        type: String,
        enum: ["apagado", "encendido", "cargando","bateria baja","monitoreando","sin conexion","error señal","mantenimiento"],
        default: "encendido"
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