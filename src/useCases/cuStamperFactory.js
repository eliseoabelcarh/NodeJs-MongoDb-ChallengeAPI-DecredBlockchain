const { getRequestModel } = require('../models/modeloRequestServer')
const { crearStamper } = require("../stamper")
const { crearModeloForHash } = require('../models/modeloForHash')
const { crearErrorArgumentosInvalidos } = require('../errors/apiError')
const fs = require('fs')

const cuStamperFactory = (function () {

    let instance

    function create(searcher, updater, stamper) {

        return {
            stamp: async (req) => {
                let { id, dataType, data, signature } = await getRequestModel(req)
                const signatureDB = await searcher.searchData({ id, type: 'signature' })
                if (dataType === 'photoIdFrontBinary') {
                    //data debió enviarse en base64, decodificamos a binary
                    // Decode from base64
                    const binary = new Buffer.from(data, 'base64');
                    await updater.updateData({ id, type: 'photoIdFrontPath', data: binary })
                }
                const forHash = crearModeloForHash({ id, data, signature, signatureDB })
                await updater.updateData({ id, type: 'verifiedName', data: false })
                await updater.updateData({ id, type: 'verifiedLastname', data: false })
                await updater.updateData({ id, type: dataType, data })
                return await stamper.stamp(forHash)
            }
        }
    }

    return {
        getInstance: function (searcher, updater, stamper) {
            if (!instance) {
                instance = create(searcher, updater, stamper)
            }
            return instance
        }
    }
}
)()

module.exports = cuStamperFactory