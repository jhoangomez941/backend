const Cliente = require('./Cliente');

const crearCliente = async (datos) => {
  try {
    // Verificamos que venga el nombre
    if (!datos.nombre) {
        return 'No asigno nombre al cliente';
    }

    // Creamos la instancia y la guardamos
    const nuevoCliente = new Cliente(datos);
    let respuesta = await nuevoCliente.save();
    return respuesta;

  } catch (error) {
    return error.message;
  }
};

module.exports = {
  crearCliente
};