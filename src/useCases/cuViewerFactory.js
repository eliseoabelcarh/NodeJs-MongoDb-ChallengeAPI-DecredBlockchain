const { getViewRequestModel } = require('../models/modeloRequestServer')
const { crearErrorArgumentosInvalidos } = require('../errors/apiError')



const cuViewerFactory = (function () {

    let instance

    function create(searcher, updater) {

        return {
            getView: async (req) => {
                const { idView } = getViewRequestModel(req)
                const { id, valid, view } = await searcher.searchData({ id: idView, type: 'view' })
                console.log('searcchchhc ', { id, valid, view })
                if (!valid) {
                    throw crearErrorArgumentosInvalidos('validez de vista', 'inválida')
                }
                await updater.updateData({ id, type: 'view', data: false })
                return view
            }
        }
    }

    return {
        getInstance: function (searcher, updater) {
            if (!instance) {
                instance = create(searcher, updater)
            }
            return instance
        }
    }
}
)()

module.exports = cuViewerFactory