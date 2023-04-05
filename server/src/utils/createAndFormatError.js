const formatErrors = require('./formatErrors');

const createAndFormatError = (message, param) => formatErrors([{ msg: message, param, }]);

module.exports = createAndFormatError;