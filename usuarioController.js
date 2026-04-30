const Usuario = require('./Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Consultar todos
obtenerUsuarios = async (datos) => {
  try {
    const usuarios = await Usuario.find();
    return usuarios
    //res.json(usuarios);
  } catch (error) {
    return error
    //res.status(500).send('Error en el servidor');
  }
};

getcorreoUsuarios = async (datos) => {

  try {
    const usuarios = await Usuario.find(datos);
    return usuarios
    //res.json(usuarios);
  } catch (error) {
    return error
    //res.status(500).send('Error en el servidor');
  }
};

// Crear usuario
crearUsuario = async (datos) => {
  try {
    if (!datos.correo) 
      return 'No asigno correo'
    if (!datos.clave) 
      return 'No asigno clave'
    
    //ENCRIPTACIÓN
    const salt = await bcrypt.genSalt(10); 
    datos.clave = await bcrypt.hash(datos.clave, salt); 

    const nuevoUsuario = new Usuario(datos);
    respuesta = await nuevoUsuario.save();
    return respuesta

  } catch (error) {
    return error.message
    //res.status(400).json({ msg: error.message });
  }
};

login = async (datos) => {
  const { correo, clave } = datos;

  try {
    let usuario = await Usuario.findOne({ correo });
    if (!usuario) 
      return 'Usuario no encontrado'
   
    /* if (!usuario.clave) 
      return 'Clave incorrecta'*/

    const claveCorrecta = await bcrypt.compare(clave, usuario.clave);
    if (!claveCorrecta) return 'Clave incorrecta';


    const payload = { usuario: { id: usuario.id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30m',
    });
    return token;

  } catch (error) {
    return 'Error en el servidor'
  }
};



module.exports = {
  obtenerUsuarios,
  crearUsuario,
  getcorreoUsuarios,
  login
};