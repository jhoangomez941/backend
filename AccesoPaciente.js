const mongoose = require('mongoose');

const accesoSchema = new mongoose.Schema({
    // El "cable" hacia el usuario que tiene el rol de paciente
    paciente_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: [true, "El ID del paciente es obligatorio"]
    },
    // El "cable" hacia el usuario que tiene el rol de doctor
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, "El ID del doctor es obligatorio"]
    },
    tipoAcceso: {
        type: String,
        enum: ["temporal", "permanente"],
        default: "permanente"
    },
    permiso: {
        type: String,
        enum: ["lectura", "edicion"], // Lectura para ver gráficas, edición para añadir diagnósticos
        default: "lectura"
    },
    fechaAsignacion: {
        type: Date,
        default: Date.now
    }
});

//  Regla de Seguridad: Previene duplicados exactos 
// Un doctor no puede tener dos permisos activos al mismo tiempo sobre el mismo paciente
accesoSchema.index({ paciente_id: 1, doctor_id: 1 }, { unique: true });

const AccesoPaciente = mongoose.model('AccesoPaciente', accesoSchema);

module.exports = AccesoPaciente;