const { getConfigDaoType } = require('../configs/daoType')
const { getConfigMongo } = require('../configs/mongoConfig')

const daoUsersMongo = require('../types/daoUsuariosMongo')

const { type } = getConfigDaoType()
const configMongo = getConfigMongo()



let daoFactory = (function () {

    let daoInstance

    function create() {
        if (type === 'mongodb') {
            return daoUsersMongo.getInstance(configMongo)
        }
        throw new Error('tipo de Dao no encontrado')

    }

    return {
        getDao: function () {
            if (!daoInstance) {
                daoInstance = await create()
            }
            return daoInstance
        }
    }

})()

module.exports = daoFactory