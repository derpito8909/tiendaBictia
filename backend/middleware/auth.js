// modulos de node
const jwt = require("jsonwebtoken");
// se implementa validacion para identificar el tendero que inicio sesion y todos los procesos
function auth(req, res, next) {
	let jwtToken = req.header("Authorization");
	// se implementa slipt para separar la palabra Beaver que esta por defecto el header del Auth
	jwtToken = jwtToken.split(" ")[1];
	// muestra un error si el token no existe
	if (!jwtToken) return res.status(406).send("No hay token para un acceso");
	try {
		const payload = jwt.verify(jwtToken, "clave");
		req.tendero = payload;
		next();
	} catch (error) {
		res.status(406).send("token sin autorizacion");
	}
}
module.exports = auth;
