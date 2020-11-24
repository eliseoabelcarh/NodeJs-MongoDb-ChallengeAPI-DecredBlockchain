const { getConfigDaoType } = require('../configs/daoType')
const { getConfigMongo } = require('../configs/mongoConfig')

const daoUsersMongo = require('../types/daoUsersMongo')
const daoFilesMongo = require('../types/daoFilesMongo')

const { type } = getConfigDaoType()
const configMongo = getConfigMongo()



let daoFactory = (function () {

    let daoInstance
    let daoFilesInstance

    function create() {
        if (type === 'mongodb') {
            return daoUsersMongo.getInstance(configMongo)
        }
        throw new Error('tipo de DaoUsers no encontrado')
    }
    function createDaoFiles() {
        if (type === 'mongodb') {
            return daoFilesMongo.getInstance(configMongo)
        }
        throw new Error('tipo de DaoFiles no encontrado')
    }


    return {
        getDao: function () {
            if (!daoInstance) {
                daoInstance = await create()
            }
            return daoInstance
        },
        getDaoFiles: function () {
            if (!daoFilesInstance) {
                daoFilesInstance = await createDaoFiles()
            }
            return daoFilesInstance
        },
    }

})()

module.exports = daoFactory