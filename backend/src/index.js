const express = require("express");
const app = express();
const PORT = 9090;

const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db");

app.use(cors());
app.use(bodyParser.json());

sequelize.sync().then(() => {
    console.log("Conectado ao MySQL");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});