const CodigoRegistro = require('./CodigoRegistro');
const crypto = require('crypto'); // Herramienta nativa de Node.js para generar textos aleatorios

// ==========================================
// Generar un código automático según el rol
// ==========================================
const crearCodigo = async (req, res) => {
    try {
        // 1. Tú (el admin) solo envías qué rol quieres crear
        const { rol_asignado } = req.body;

        if (!["paciente", "doctor", "hospital"].includes(rol_asignado)) {
            return res.status(400).json({ mensaje: "Rol inválido. Debe ser paciente, doctor u hospital." });
        }

        // 2. El sistema genera el código automáticamente
        // Primero, definimos un prefijo para que sea fácil de leer (DOC-, HOSP-, PAC-)
        let prefijo = "";
        if (rol_asignado === "doctor") prefijo = "DOC";
        else if (rol_asignado === "hospital") prefijo = "HOSP";
        else if (rol_asignado === "paciente") prefijo = "PAC";

        // Luego, generamos 6 caracteres aleatorios (ej: 8F2A9C)
        const caracteresAleatorios = crypto.randomBytes(3).toString('hex').toUpperCase();
        
        // Unimos el prefijo con los caracteres (ej: DOC-8F2A9C)
        const tokenGenerado = `${prefijo}-${caracteresAleatorios}`;

        // 3. Creamos el molde con el código que el sistema acaba de inventar
        const nuevoCodigo = new CodigoRegistro({
            token: tokenGenerado,
            rol_asignado: rol_asignado
        });

        // 4. Lo guardamos en la base de datos
        await nuevoCodigo.save();

        // 5. El sistema te devuelve el código para que se lo des al usuario
        res.status(201).json({
            mensaje: "Código generado exitosamente",
            codigo_para_entregar: nuevoCodigo.token, // Este es el que copias y le envías al doctor
            rol: nuevoCodigo.rol_asignado
        });

    } catch (error) {
        console.error("Error al crear código:", error);
        res.status(500).json({ mensaje: "Error del servidor", error: error.message });
    }
};

module.exports = {
    crearCodigo
};