
let config                                        = require('config');

exports.databaseSettings = {
    mongo : {
        connectionString : config.get('databaseSettings.mongo_db_connection')
    }
};

exports.port            = process.env.PORT || config.get('PORT');
