const DispositivoECG = require('./DispositivoECG');
const jwt = require('jsonwebtoken');
// registro de nuevo equipo
const crearDispositivo = async (req,res)=>{
  try{
    const {serial}=req.body;

    const existedispositivo = await DispositivoECG.findOne({serial: serial});
    if(existedispositivo){
      return res.status(400).json({mensaje:"serial ya registrado"});
    }

  const nuevodispositivo = new DispositivoECG({
    serial: serial,
    estado:"apagado"
  })
  await nuevodispositivo.save();

  res.status(200).json({
    mensaje: "Dispositivo vinculado exitosamente",
    dispositivo:nuevodispositivo
  });

  }catch(error){
    console.error("no se pudo vincular el dispositivo",error);
    res.status(500).json({mensaje:"error de servidor", error:error.message});
  }
};

const VincularDispositivo = async(req,res)=>{
  try{
    const{serial, usuario_id}=req.body;

   const dispositivo = await DispositivoECG.findOne({serial:serial});

   if(!dispositivo){

    return res.status(404).json({mensaje:"dispositivo no encontrado en el sistema"});

   }
   if(dispositivo.usuario_id){

    return res.status(400).json({
      mensaje:"Disposito ya asignado"
    });
   }

   dispositivo.usuario_id=usuario_id;
   dispositivo.estado="encendido";

   await dispositivo.save();

   res.status(200).json({
    mensaje:"dispositivo vinculado exitosamente",
    dispositivo: dispositivo
   });


  }catch(error){
    console.error("error al vincular el dispositivo",error);
    res.status(500).json({mensaje:"error de servidor",error:error.message});
  }
};
module.exports={
  crearDispositivo,
  VincularDispositivo
}