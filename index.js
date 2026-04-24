require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const bcrypt=require('bcryptjs');
const app = express();
const port =3000;

const Usuario = require('./Usuario');
const usuarioController = require('./usuarioController');
const clienteController = require('./clienteController');
const dispositivoController = require('./dispositivoController');
const sesionController = require('./sesionController');
const accesoController = require('./accesoController');
const auth = require('./middleware/auth');


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

app.post('/crearUsuario',auth,async(req, res) => {
  let datos = req.body;
  console.log(datos); 
  let respuesta = await usuarioController.crearUsuario(datos);

  let payload = {
    msg : respuesta
      
  }
  res.send(payload);
});


app.post('/crearCliente', async(req, res) => {
  let datos = req.body;
  console.log("Datos recibidos para cliente:", datos); 
  let respuesta = await clienteController.crearCliente(datos);

  let payload = {
    msg : respuesta
  }
  res.send(payload);
});


app.post('/crearDispositivo', async(req, res) => {
  let datos = req.body;
  let respuesta = await dispositivoController.crearDispositivo(datos);
  res.send({ msg: respuesta });
});

app.post('/concederAcceso', async(req, res) => {
  let datos = req.body;
  let respuesta = await accesoController.concederAcceso(datos);
  res.send({ msg: respuesta });
});


app.post('/login', async(req, res) => {
  let datos = req.body;
  let respuesta = await usuarioController.login(datos);
  res.send({ msg: respuesta });
});


/*app.post('/crearSesion', async(req, res) => {
  let datos = req.body;
  let respuesta = await sesionController.crearSesion(datos);
  res.send({ msg: respuesta });
});*/


app.listen(port, () => {
  console.log(`Example app listening on port${port}`);
});
