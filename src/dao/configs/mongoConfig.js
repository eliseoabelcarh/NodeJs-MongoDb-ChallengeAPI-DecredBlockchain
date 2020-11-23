
require('dotenv').config()


function getConfigMongo() {
    return {
        cnxString: process.env.CNX_STRING_MONGO
    }
}


module.exports = {
    getConfigMongo
}