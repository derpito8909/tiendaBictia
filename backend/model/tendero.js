//importar los modeulso de node.js
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// implementar el schema de la collecion
const tenderoSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    pass: String,
    fecha: {
        type: Date,
        default: Date.now,
    }
})
// generar el JWT
tenderoSchema.methods.generateJWT = function () {
    return jwt.sign({
        _id: this.id,
        nombre: this.nombre,
        pass: this.pass,
    },
        "clave"
    );
};
// crear los exports
const Tendero = mongoose.model("tendero", tenderoSchema);
module.exports.Tendero = Tendero;