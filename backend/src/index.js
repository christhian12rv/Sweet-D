const express = require("express");
const app = express();
const PORT = 9090;
if (process.env.NODE_ENV !== "production")
    require("dotenv").config();

const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const fileUpload = require("express-fileUpload");

const usersRoute = require("./routes/users.route");
const productsRoute = require("./routes/products.route");

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

sequelize.sync().then(() => {
    console.log("Conectado ao MySQL");
}).catch((error) => console.log("Ocorreu um erro ao conectar ao MySQL: " + error));

app.use("/users", usersRoute);
app.use("/products", productsRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});