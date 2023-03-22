const log4js = require('log4js');

log4js.configure({
	appenders: {
		out: { type: 'stdout', },
		cheese: { type: 'file', filename: './logs/app.log', },
	},
	categories: { default: { appenders: ['out', 'cheese'], level: 'info', }, },
});

module.exports = log4js.getLogger();