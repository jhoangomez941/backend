const DispositivoECG = require('./DispositivoECG');
const jwt = require('jsonwebtoken');
const crearDispositivo = async (datos) => {
  try {
    if (!datos.serial) return 'Falta el serial del dispositivo';
    if (!datos.cliente_id) return 'Falta asignar el cliente_id';

    const nuevoDispositivo = new DispositivoECG(datos);
    let respuesta = await nuevoDispositivo.save();
    return respuesta;

  } catch (error) {
    // Código 11000 es el error de MongoDB para un dato "unique" duplicado
    if (error.code === 11000) {
        return 'Ya existe un dispositivo registrado con este serial';
    }
    return error.message;
  }
};

module.exports = {
  crearDispositivo
};