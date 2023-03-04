const express = require("express");
const config = require('./configs/config');
const app = express();
const PORT = config.port || 9090;

const path = require("path");
const favicon = require("express-favicon");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const sequelize = require("./configs/db");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cloudinary = require("cloudinary").v2;

const indexRoute = require("./routes/index.route");
const usersRoute = require("./routes/users.route");
const productsRoute = require("./routes/products.route");
const ordersRoute = require("./routes/orders.route");
const cartRoute = require("./routes/cart.route");

const corsOptions = {
    origin: config.clientUrl,  //access-control-allow-credentials:true
    optionSuccessStatus:200,
};

app.use(favicon(__dirname + "/build/favicon.ico"));
app.use(express.static(__dirname));
app.use(cors());
app.use(compression());
app.use(helmet());
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

app.use("/api", indexRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/cart", cartRoute);

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});