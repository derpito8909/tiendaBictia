//importar los modulos de node.js
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
//se crea el Schema de la colleccion Productos
const productosSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    precio: Number,
    idTendero: String,
    fecha: {
        type: Date,
        default: Date.now,
    },
});
// Creamos los exports
const Productos = mongoose.model("productos", productosSchema);
module.exports.Productos = Productos;