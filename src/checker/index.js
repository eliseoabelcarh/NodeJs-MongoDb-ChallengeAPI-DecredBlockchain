const { crearModeloHashCombined } = require('../models/modeloHashCombined')


const crearChecker = (timestamp, hasher, searcher) => {

    // const forHash = {0: userId, 1: signature, 2: data }

    return {

        check: async ({ id, type }) => {
            const signature = await searcher.searchData({ id, type: 'signature' })
            const data = await searcher.searchData({ id, type })
            const forHash = { 0: id.toString(), 1: signature, 2: data }
            const { id, combined } = crearModeloHashCombined(forHash, hasher)
            const res = await timestamp.verifyOne({ id, digest: combined })
            console.log('axios responseData ', res.data)
            return res.data.results[0]
        }

    }
}


module.exports = { crearChecker }