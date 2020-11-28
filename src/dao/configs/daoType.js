
require('dotenv').config()


function getConfigDaoType() {
    return {
        type: process.env.DAO_USUARIOS_TYPE || 'mongodb'
    }
}


module.exports = {
    getConfigDaoType
}