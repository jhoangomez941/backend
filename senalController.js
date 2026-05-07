const SenalECG = require('./SenalECG');

const Recibirpaquetedatos = async (req, res) =>{
  try{
    const { usuario_id,dispositivo_id,datos_grafica,datos_derivados} = req.body;



    if(!usuario_id||!datos_grafica){
      return res.status(400).json({
        mensaje:"faltan datos para registrar señal"
      })

    }

    const nuevasenal =new SenalECG({ 
      usuario_id,
      dispositivo_id,
      datos_grafica,
      datos_derivados
    });

  await nuevasenal.save();
   res.status(201).json({
            mensaje: "paquete de señales guardado",
            
        });
  }catch(error){

    console.error("Error al recibir señal ECG:", error);
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
  }
};
module.exports={
  Recibirpaquetedatos
}