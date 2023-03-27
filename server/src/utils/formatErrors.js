const formatErrors = (errors) => errors.map(e => ({
	message: e.msg,
	field: e.param,
}));

module.exports = formatErrors;