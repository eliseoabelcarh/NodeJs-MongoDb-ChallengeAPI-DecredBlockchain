const { crearErrorArgumentosInvalidos } = require('../errors/apiError')
const { crearModeloHashCombined } = require('../models/modeloHashCombined')

const crearStamper = (timestamp, hasher) => {

    // const forHash = {0: userId, 1: signature, 2: data }

    return {

        stamp: async (forHash) => {
            const { id, combined } = crearModeloHashCombined(forHash, hasher)
            const res = await timestamp.timestampOne({ id, digest: combined })
            if (res.data.results[0] !== 0) {
                throw crearErrorArgumentosInvalidos('stamp no exitoso, resultado fue', res.data.results[0])
            }
            return res.data.results[0]
        }
    }
}

module.exports = { crearStamper }