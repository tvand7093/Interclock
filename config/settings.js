var path = require('path');

// Defaults that you can access when you require this config.
module.exports = {
    rootPath: path.normalize(__dirname + '/../..'),
    port: parseInt(process.env.PORT, 10) || 3000,
    host: '0.0.0.0',
    apiKey: 'a9f79683444236ece519cf34ee9150f6dcbc34a6'
};

