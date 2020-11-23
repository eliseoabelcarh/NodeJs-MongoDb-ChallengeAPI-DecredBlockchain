const { crearErrorArgumentosInvalidos } = require('../errors/apiError')


const getIdFromRequest = (req) => {
    if (!req) {
        throw crearErrorArgumentosInvalidos('req', 'campo vacío')
    }
    if (!req.params) {
        throw crearErrorArgumentosInvalidos('req.params', 'campo vacío')
    }
    if (!req.params.id) {
        throw crearErrorArgumentosInvalidos('req.params.id', 'campo vacío')
    }
    return req.params.id
}

const getDataTypeFromRequest = (req) => {



}

module.exports = { getIdFromRequest, getDataTypeFromRequest }