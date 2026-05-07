const mongoose =require('mongoose');


const codigoRegistroSchema = new mongoose.Schema({

    token:{

        type:String,
        required:[true,"el token es obligatorio"],
        unique:true,
        trim:true,

    },
    rol_asignado:{
        type:String,
        enum:["paciente","doctor","hospital"],
        required:[true,"el rol es obligatorio"],
        lowercase:true,

    },
    esta_usado:{
    type:Boolean,
    default:false
    },
    usuario_que_lo_uso:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        default:null,

    },
        fechaRegistro: {
        type: Date,
        default: Date.now
    }

});

module.exports=mongoose.model('codigoRegistro',codigoRegistroSchema);