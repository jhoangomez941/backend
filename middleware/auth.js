const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso denegado' });
  }

  try {
    const cifrado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = cifrado.usuario; // Añadimos los datos del usuario al objeto request
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};
/*
const verificarToken = (req, res, next) => {
    // 1. Obtener el token de los headers (usualmente viene como "Bearer <token>")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    // 2. Si no hay token, rechazamos la petición
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        // 3. Verificar si el token es válido
        // Nota: En producción, 'mi_clave_secreta' debe estar en un archivo .env (process.env.JWT_SECRET)
        const decodificado = jwt.verify(token, 'mi_clave_secreta'); 
        
        // 4. Guardar la información del usuario en la petición para usarla en los controladores
        req.usuario = decodificado; 
        
        // 5. Permitir que la petición continúe hacia el controlador
        next(); 
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};
*/
