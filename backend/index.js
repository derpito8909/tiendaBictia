// Modulos Node
const express = require("express");
const mongoose = require("mongoose");
// Modulos internos
const tendero = require("./routes/tendero");
const auth = require("./routes/auth");
const producto = require("./routes/productos");

//se implementa la varible del servidor
const app = express();
app.use(express.json());
app.use("/api/tendero/", tendero);
app.use("/api/auth/", auth);
app.use("/api/producto/", producto);
// Puerto para ejecutar nuestro servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Ejecutando en el puerto " + port));
// conexion con Mongo
mongoose
	.connect("mongodb://localhost/tiendaBictia", {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Conexion a Mongo: online"))
	.catch((error) => console.log("Conexion a Mongo:Offline"));
