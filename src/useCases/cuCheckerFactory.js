const { getCheckRequestModel } = require('../models/modeloRequestServer')
const { signatureMatch } = require('../models/modeloUser')
const { crearOneTimeViewModel } = require('../models/modeloView')
const { crearModeloForHash } = require('../models/modeloForHash')
const cuCheckerFactory = (function () {

    let instance

    function create(checker, hasher, searcher, storer) {

        return {
            //se utiliza para recibir la solicitud del usuario con los datos
            // que desea compartir, se hace la verificaciones correspondientes 
            // para poder generar un ID VIEW que será utilizado en un link share
            check: async (req) => {
                const { id, signature, types } = await getCheckRequestModel(req, searcher)
                const signatureDB = await searcher.searchData({ id, type: 'signature' })
                signatureMatch(signatureDB, signature)
                const datosForView = {}
                for (const type of types) {
                    const data = await searcher.searchData({ id, type })
                    let forHash = crearModeloForHash({ id, data, signature, signatureDB })
                    let res = await checker.check(forHash)
                    if (res === 0 /*0 is success */) {
                        datosForView[type] = await searcher.searchData({ id, type })
                    }
                }
                return await crearOneTimeViewModel(datosForView, storer, hasher)
            }
        }
    }

    return {
        getInstance: function (checker, hasher, searcher, storer) {
            if (!instance) {
                instance = create(checker, hasher, searcher, storer)
            }
            return instance
        }
    }
}
)()

module.exports = cuCheckerFactory