const { getConfigDaoType } = require('../configs/daoType')
const { getConfigMongo } = require('../configs/mongoConfig')

const daoUsersMongo = require('../types/daoUsersMongo')
const daoViewsMongo = require('../types/daoViewsMongo')

const { type } = getConfigDaoType()
const configMongo = getConfigMongo()



let daoFactory = (function () {

    let daoInstance
    let daoViewsInstance

    //función que devuelve base de datos para usuarios
    function create() {
        if (type === 'mongodb') {
            return daoUsersMongo.getInstance(configMongo)
        }
        throw new Error('tipo de DaoUsers no encontrado')
    }
    // devuelve únicamente la base de datos para
    // guardar las vistas y los datos que se van a compartir
    function createDaoViews() {
        if (type === 'mongodb') {
            return daoViewsMongo.getInstance(configMongo)
        }
        throw new Error('tipo de DaoUsers no encontrado')
    }


    return {
        getDao: function () {
            if (!daoInstance) {
                daoInstance = create()
            }
            return daoInstance
        },
        getDaoViews: function () {
            if (!daoViewsInstance) {
                daoViewsInstance = createDaoViews()
            }
            return daoViewsInstance
        },

    }

})()

module.exports = daoFactory