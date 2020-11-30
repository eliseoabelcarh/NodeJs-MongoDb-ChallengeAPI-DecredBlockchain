
require('dotenv').config()


//base de datos predeterminada mongoDB
//futuros releases mongodb reemplazado por guardado 
//descentralizado en blockchain
function getConfigDaoType() {
    return {
        type: process.env.DAO_TYPE || 'mongodb'
    }
}


module.exports = {
    getConfigDaoType
}