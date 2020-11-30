
require('dotenv').config()


//agregar valores en .env file
function getConfigMongo() {
    return {
        cnxString: process.env.CNX_STRING_MONGO
    }
}


module.exports = {
    getConfigMongo
}