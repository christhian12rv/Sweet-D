require("dotenv/config");

module.exports = {
	nodeEnv: process.env.NODE_ENV,
	dbHost: process.env.DB_HOST,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT,
	nodemailerUser: process.env.NODEMAILER_USER,
	nodemailerPassword: process.env.NODEMAILER_PASSWORD,
	jwtSecret: process.env.JWT_SECRET,
	clientUrl: process.env.CLIENT_URL,
	port: process.env.PORT,
};