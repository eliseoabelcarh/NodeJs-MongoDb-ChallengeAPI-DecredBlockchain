const { crearErrorArgumentosInvalidos } = require('../errors/apiError')
const { crearModeloHashCombined } = require('../models/modeloHashCombined')

const crearStamper = (timestamp, hasher) => {

    // MODELO forHash = {0: userId, 1: signature, 2: data }

    return {

        //crea el modelo combinado con los datos originales
        // del modelo FORHASH
        //para estamparlos en la blockchain
        stamp: async (forHash) => {
            const { id, combined } = crearModeloHashCombined(forHash, hasher)
            const res = await timestamp.timestampOne({ id, digest: combined })
            if (res.data.results[0] !== 0) {
                throw crearErrorArgumentosInvalidos('stamp no exitoso, resultado fue', res.data.results[0])
            }
            console.log('resultado de STAMP: ', res.data)
            return res.data.results[0]
        }
    }
}

module.exports = { crearStamper }