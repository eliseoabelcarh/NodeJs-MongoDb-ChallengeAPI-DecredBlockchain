const { crearModeloHashCombined } = require('../models/modeloHashCombined')


const crearStamper = (timestamp, hasher) => {


    return {

        stamp: async (forHash) => {

            const { id, combined } = crearModeloHashCombined(forHash, hasher)
            const res = await timestamp.timestampOne({ id, digest: combined })
            console.log('axios rssponseData ', res.data)
            return res.data.results[0]
            //ok - 0
            //ya existe - 1
            //no se encontró - 2
            //está deshabilitado -3
            //maybe 0 anchored - 1 pending - 2 not anchored
        }
    }
}


module.exports = { crearStamper }