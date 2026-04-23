const SesionECG = require('./SesionECG');

const crearSesion = async (datos) => {
  try {
    if (!datos.usuario_id) return 'Falta el ID del usuario/paciente para la sesión';

    const nuevaSesion = new SesionECG(datos);
    let respuesta = await nuevaSesion.save();
    return respuesta;

  } catch (error) {
    return error.message;
  }
};

module.exports = {
  crearSesion
};