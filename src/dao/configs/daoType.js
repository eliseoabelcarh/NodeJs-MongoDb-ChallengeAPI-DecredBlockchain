
require('dotenv').config()


function getConfigDaoType() {
    return {
        type: process.env.DAO_TYPE || 'mongodb'
    }
}


module.exports = {
    getConfigDaoType
}