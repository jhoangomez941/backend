require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const auth =require( '.middleware/auth');
//const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const app = express();
const port =3000;

const Usuario = require('./Usuario');
const usuarioController = require('./usuarioController');

app.use(express.json());

console.log("start");
conectar().catch(err => console.log(err));

async function conectar() {
  await mongoose.connect(process.env.MONGO_URI);
console.log ("conectado")
}



app.get('/', (req, res) => {
var payload = {
    mensaje: "Hola Mundo!",  
  }

  res.send(payload);
});


app.get('/hora', (req, res) => {
console.log(req);

var payload = {

    mensaje: "Hola Mundo!",  
    hora: new Date().toLocaleTimeString()     
  }

  res.send(payload);
});

app.get('/doble', (req, res) => {
console.log(req.query);

var payload = {

    mensaje: "Hola Mundo!",  
    hora: new Date().toLocaleTimeString()     
  }

  res.send(payload);
});

app.post('/crearUsuario', async(req, res) => {
  let datos = req.body;
  console.log(datos); 
  let respuesta = await usuarioController.crearUsuario(datos);

  let payload = {
    msg : respuesta
      
  }
  res.send(payload);
});

app.listen(port, () => {
  console.log(`Example app listening on port${port}`);
});

/*
// Importar el controlador y el middleware
//const usuariocontroller = require('./usuarioController');
const verificarToken = require('./middleware/auth');

//app.use(express.json());

// ==========================================
// RUTAS PÚBLICAS (No usan el middleware)
// ==========================================
// El login debe ser público para que el usuario pueda obtener su token
app.post('/api/login', usuarioController.login);

// Si tienes una ruta de registro, usualmente también es pública
// app.post('/api/usuarios/registro', usuarioController.crearUsuario); 


// ==========================================
// RUTAS PROTEGIDAS (Usan el middleware)
// ==========================================

// Opción A: Aplicar el middleware ruta por ruta
// Pasas `verificarToken` como segundo parámetro, antes del controlador
app.get('/api/usuarios', verificarToken, usuarioController.obtenerUsuarios);
app.put('/api/usuarios/:id', verificarToken, usuarioController.crearUsuario);

// Opción B: Proteger un grupo de rutas globalmente
// Todo lo que declares debajo de `app.use(verificarToken)` requerirá autenticación
// app.use(verificarToken);
// app.get('/api/datos-sensibles', algunControlador.obtenerDatos);

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});*/