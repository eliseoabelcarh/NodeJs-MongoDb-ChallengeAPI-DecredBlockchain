const { getUserModelFromRequest, getApplyVerificationModel } = require('../models/modeloRequestServer')
const { signatureMatch, dataMatch } = require('../models/modeloUser')
const { crearModeloForHash } = require('../models/modeloForHash')
const cuVerificationFactory = (function () {

    let instance

    function create(searcher, interpreter, stamper, updater) {

        return {
            // se utiliza para manejar las solicitudes de usuario para verificar sus datos
            // se hace una lectura a la foto del dni para comparar datos
            // si coinciden guardamos los datos en la blockchain
            apply: async (req) => {
                const { id, type, signature, verifiedType } = getApplyVerificationModel(req)
                const data = await searcher.searchData({ id, type })//name or lastname only
                const signatureDB = await searcher.searchData({ id, type: 'signature' })
                const photoIdFrontPath = await searcher.searchData({ id, type: 'photoIdFrontPath' })
                signatureMatch(signatureDB, signature)
                const dataFromPath = await interpreter.readPath({ type, path: photoIdFrontPath })
                dataMatch(data, dataFromPath)
                const forHash = crearModeloForHash({ id, data, signature, signatureDB })
                await stamper.stamp(forHash)
                await updater.updateData({ id, type: verifiedType, data: true })
                return true
            }
        }
    }

    return {
        getInstance: function (searcher, interpreter, stamper, updater) {
            if (!instance) {
                instance = create(searcher, interpreter, stamper, updater)
            }
            return instance
        }
    }
}
)()

module.exports = cuVerificationFactory