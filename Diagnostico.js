const mongoose= require ("mongoose");

const diagnosticoSchema = new mongoose.Schema({
    doctor_id:{
        type:mongoose.Schema.Types.ObjectId,
         ref: 'Usuario',
         required: [true, "El ID del doctor es obligatorio"]
    },
    paciente_id:{
    type:mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, "El ID del paciente es obligatorio"]
    },
    observaciones:{
    type:String,
    required: [true, "Las observaciones médicas son obligatorias"]
    },
    fechaRegistro: {
       type: Date,
       default: Date.now
    },

});

module.exports = mongoose.model('diagnostico',diagnosticoSchema)