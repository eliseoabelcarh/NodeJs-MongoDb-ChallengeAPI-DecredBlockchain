const { getIdFromRequest, getDataTypeFromRequest } = require('../models/modeloRequestServer')
const { crearStamper } = require("../stamper")


const cuStamperFactory = (function () {

    let instance

    function create(timestamp, hasher, searcher) {

        const stamper = crearStamper(timestamp, hasher, searcher)
        /* const forHash = {
        0: userId,
        1: signature,
        2: data
        } */
        return {
            stamp: async (req) => {
                const id = getIdFromRequest(req)
                const type = getDataTypeFromRequest(req)
                const data = getDataFromRequest(req)
                const signature = getSignatureFromRequest(req)
                const signatureDB = await searcher.searchData({ id, type: 'signature' })
                //---------------------------------------------------------- crearModeloForHash()
                return await stamper.stamp(forHash)
            }
        }
    }

    return {
        getInstance: function (timestamp, hasher, searcher) {
            if (!instance) {
                instance = create(timestamp, hasher, searcher)
            }
            return instance
        }
    }
}
)()

module.exports = cuStamperFactory