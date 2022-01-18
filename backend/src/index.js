const express = require("express");
const app = express();
const PORT = 9090;

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});