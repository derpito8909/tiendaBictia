const express = require("express");
const router = express.Router();
//modulos internos
const { Productos } = require("../model/productos");
const { Tendero } = require("../model/tendero");
const auth = require("../middleware/auth");
//ruta
router.post("/", auth, async (req, res) => {
	// se obtiene el id del tendero autenticado
	const tendero = await Tendero.findById(req.tendero._id);
	// se muestra error si el tendero no existe
	if (!tendero) return res.status(400).send("El tendero no existe");
	// se implementa el producto si el tendero existe
	const producto = new Productos({
		idTendero: tendero._id,
		nombre: req.body.nombre,
		tipo: req.body.tipo,
		precio: req.body.precio,
	});
	// se envia el resultado
	const result = await producto.save();
	res.status(200).send(result);
});
module.exports = router;
