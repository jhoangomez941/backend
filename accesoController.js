const AccesoPaciente = require('./AccesoPaciente');

const concederAcceso = async (datos) => {
  try {
    if (!datos.paciente_id || !datos.doctor_id) {
        return 'Debe enviar tanto el ID del paciente como el del doctor';
    }

    const nuevoAcceso = new AccesoPaciente(datos);
    let respuesta = await nuevoAcceso.save();
    return respuesta;

  } catch (error) {
    // Si choca con la regla de seguridad del index (Código 11000)
    if (error.code === 11000) {
        return 'Este doctor ya tiene un acceso asignado a este paciente';
    }
    return error.message;
  }
};

module.exports = {
  concederAcceso
};