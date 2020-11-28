const { crearModeloHashCombined } = require('../models/modeloHashCombined')


const crearChecker = (timestamp, hasher, searcher) => {

    // const forHash = {0: userId, 1: signature, 2: data }

    return {

        check: async (forHash) => {
            const { id, combined } = crearModeloHashCombined(forHash, hasher)
            const res = await timestamp.verifyOne({ id, digest: combined })
            return res.data.digests[0].result
        }

    }
}

module.exports = { crearChecker }