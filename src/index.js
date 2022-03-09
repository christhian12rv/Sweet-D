const express = require("express");
const app = express();
const PORT = process.env.PORT || 9090;
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const path = require("path");
const favicon = require("express-favicon");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./db");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cloudinary = require("cloudinary").v2;

const indexRoute = require("./routes/index.route");
const usersRoute = require("./routes/users.route");
const productsRoute = require("./routes/products.route");
const ordersRoute = require("./routes/orders.route");
const cartRoute = require("./routes/cart.route");

app.use(favicon(__dirname + "/build/favicon.ico"));
app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 3 * 1000 * 60 * 60 * 24 }
    })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "../client/build")));

sequelize
    .sync()
    .then(() => {
        console.log("Conectado ao MySQL");
    })
    .catch(error => console.log(error));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

require("./schedules/passwordChange")();

app.use("/", indexRoute);
app.use("/users", usersRoute);
app.use("/products", productsRoute);
app.use("/orders", ordersRoute);
app.use("/cart", cartRoute);

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
