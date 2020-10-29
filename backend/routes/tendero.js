//Modulos internos
const express = require("express");
const { Productos } = require("../model/productos");
const router = express.Router();
// Modulos creados
const { Tendero } = require("../model/tendero");
//Implementar la ruta del tendero
router.post("/", async (req, res) => {
    let tendero = await Tendero.findOne({ correo: req.body.correo });
    // se muestra un error si ya se escuentra en BD
    if (tendero) return res.status(400).send("El tendero y esta registrado");
    // se implementa los campos del tendero a registar si no en BD
    tendero = new Tendero({
        nombre: req.body.nombre,
        correo: req.body.correo,
        pass: req.body.pass,
    });
    // se guarda el tendero que se crea con JWT
    const result = await tendero.save();
    const jwtToken = tendero.generateJWT();
    res.status(200).send({ jwtToken });
});
//Exports
module.exports = router;