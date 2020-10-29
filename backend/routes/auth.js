// Modulos de Node
const express = require("express");
const router = express.Router();
// modulos internos
const { Tendero } = require("../model/tendero");
const { route } = require("./tendero");

//
router.post("/", async (req, res) => {
	//validamos que el correo exista
	const tendero = await Tendero.findOne({ correo: req.body.correo });
	if (!tendero) return res.status(400).send("Correo o contraseña no son validos");
	// si el pass no existe
	if (tendero.pass !== req.body.pass) return res.status(400).send("Correos o contraseña no son validos");
	// generar un JWT
	const jwtToken = tendero.generateJWT();
	res.status(200).send({ jwtToken });
});
module.exports = router;