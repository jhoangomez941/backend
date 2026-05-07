const Usuario = require('./Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CodigoRegistro = require('./CodigoRegistro');

const registrarUsuario = async (req, res) => {
    try {
        // 1. Recibimos los datos que envía el frontend o Postman (el cuerpo de la petición)
        const { nombre, apellido, correo, clave, telefono, codigo_activacion } = req.body;

        const encontrar_usuario= await Usuario.findOne({correo:correo});
        if(encontrar_usuario){
           return res.status(400).json({
            mensaje:"El correo ya esta registrado"
           });
        }

        /*let rol_asignado = "paciente"
        if(codigo_activacion){
          const codigoMayusculas = codigo_activacion.toUpperCase();
          if(codigoMayusculas.includes("HOSP")){
            rol_asignado="hospital"
          }else if(codigoMayusculas.includes("DOC")){
            rol_asignado="doctor"
          }
        }*/

        let rol_asignado = "paciente"
        let documentoCodigo= null
        if(codigo_activacion){
          documentoCodigo = await CodigoRegistro.findOne({token:codigo_activacion});
        
        if(!documentoCodigo){
          return res.status(400).json({ mensaje: "El código de registro no es válido." });
        }
        if(documentoCodigo.esta_usado){

        return res.status(400).json({ mensaje: "Este código ya fue utilizado." });
          
        }
        rol_asignado = documentoCodigo.rol_asignado;
      }

       if(!codigo_activacion){
          return res.status(400).json({ mensaje: "El codigo de activacion es obligatorio" });
        }

  
        const salt = await bcrypt.genSalt(10);
        const claveEncriptada = await bcrypt.hash(clave, salt);
        const nuevoUsuario = new Usuario({
            nombre,
            apellido,
            correo,
            clave: claveEncriptada, // Recuerda: más adelante encriptaremos esto por seguridad
            telefono,
            codigo_activacion,
            rol: rol_asignado // Aquí conectamos el campo de la BD con nuestra variable del Reto 2
        });

      
        // Usamos await porque guardar datos toma tiempo
        await nuevoUsuario.save();


        // 4. Si todo sale bien, respondemos con éxito
        res.status(201).json({
            mensaje: "Usuario registrado con éxito",
            // OPCIONAL: Puedes devolver el nuevoUsuario aquí para verlo en la respuesta
        });
    if (documentoCodigo) {
            documentoCodigo.esta_usado = true;
            documentoCodigo.usuario_que_lo_uso = nuevoUsuario._id; // Dejamos registro de quién lo usó
            await documentoCodigo.save();
        }

    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
  
};

const login =async (req,res) => {
  try{

    const{ correo,clave}=req.body;

    const usuarioexistente =await Usuario.findOne({correo: correo})

    if(!usuarioexistente){
      return res.status(400).json({mensaje: "Correo o contraseña incorrectos"})
    }


const claveverificada= await bcrypt.compare(clave,usuarioexistente.clave);

if(!claveverificada){
  return res.status(400).json({mensaje:"correo o contraseña incorrectos"})
}

const payload = { // carga util de datos
  usuarioId: usuarioexistente._id,
  rol:usuarioexistente.rol
};
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
res.status(200).json({
  mensaje: "Inicio de sesion exitoso",
  token:token,

  usuario: {
    id: usuarioexistente._id,
    nombre: usuarioexistente.nombre,
    rol:usuarioexistente.rol

  }

});

  }
  catch(error){
    console.error("error al ingresar:",error);
    res.status(500).json({mensaje:"error interno",error:error.message});
  }
};

module.exports = {
    registrarUsuario,
    login
};



// Consultar todos
/*obtenerUsuarios = async (datos) => {
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
   

    */

    /* if (!usuario.clave) 
      return 'Clave incorrecta'*/

   /* const claveCorrecta = await bcrypt.compare(clave, usuario.clave);
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
};*/