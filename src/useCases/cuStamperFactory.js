const { getRequestModel } = require('../models/modeloRequestServer')
const { crearStamper } = require("../stamper")
const { crearModeloForHash } = require('../models/modeloForHash')

const cuStamperFactory = (function () {

    let instance

    function create(timestamp, hasher, searcher, storer) {

        const stamper = crearStamper(timestamp, hasher)

        return {
            stamp: async (req) => {
                const { id, dataType, data, signature, signatureDB } = await getRequestModel(req, searcher)
                await storer.storeData({ id, type: dataType, data })
                const forHash = crearModeloForHash({ id, data, signature, signatureDB })
                return await stamper.stamp(forHash)
            }
        }
    }

    return {
        getInstance: function (timestamp, hasher, searcher, storer) {
            if (!instance) {
                instance = create(timestamp, hasher, searcher, storer)
            }
            return instance
        }
    }
}
)()

module.exports = cuStamperFactory