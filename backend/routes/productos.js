const express = require("express");
const router = express.Router();
//modulos internos
const { Productos } = require("../model/productos");
const { Tendero } = require("../model/tendero");
const auth = require("../middleware/auth");
//ruta
// listar todos los productos
router.get("/lista", auth, async (req, res) => {
	// se Buscar el usuario
	const tendero = await Tendero.findById(req.tendero._id);
	// si no existe el usuario
	if (!tendero) return res.status(400).send("El tendero no existe en BD");
	// si el usuario existe
	const producto = await Productos.find({ idTendero: req.tendero._id });
	res.send(producto);
});
//ingresar un producto
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
//actualizar producto
router.put("/", auth, async (req, res) => {
	const tendero = await Tendero.findById(req.tendero._id);
	// si el tendero no existe
	if (!tendero) return res.status(400).send("El tendero no existe en BD");
	// si el usuario existe
	const producto = await Productos.findByIdAndUpdate(
		req.body._id,
		{
			idTendero: req.tendero._id,
			nombre: req.body.nombre,
			tipo: req.body.tipo,
			precio: req.body.precio,
		},
		{
			new: true,
		}
	);
	if (!producto) return res.status(400).send("no hay producto asignada a este usuario");
	res.status(200).send(producto);
});
// Eliminar Actividad
router.delete("/:_id", auth, async (req, res) => {
	//Buscamos el usuario
	const tendero = await Tendero.findById(req.tendero._id);
	// error si no se encuentra el usuario
	const producto = await Productos.findByIdAndDelete(req.params._id);
	// si no existe esa actividad
	if (!producto) return res.status(400).send("No se encontro producto para eliminar");
	// si se elimina el mensaje
	res.status(200).send({ message: "Producto eliminado" });
});
module.exports = router;
