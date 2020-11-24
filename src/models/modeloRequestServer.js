const { crearErrorArgumentosInvalidos } = require('../errors/apiError')



// id debe llegar en url como params
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

const checkBodyRequest = (req) => {
    if (!req) {
        throw crearErrorArgumentosInvalidos('req', 'campo vacío')
    }
    if (!req.body) {
        throw crearErrorArgumentosInvalidos('req.body', 'campo vacío')
    }

}
//lega como property de objeto en el POST
const getDataTypeFromRequest = (req) => {
    checkBodyRequest(req)
    if (!req.body.dataType) {
        throw crearErrorArgumentosInvalidos('req.body.dataType', 'campo vacío')
    }
    return req.body.dataType
}
const getDataFromRequest = (req) => {
    checkBodyRequest(req)
    if (!req.body.data) {
        throw crearErrorArgumentosInvalidos('req.body.data', 'campo vacío')
    }
    return req.body.data
}

const getSignatureFromRequest = (req) => {
    checkBodyRequest(req)
    if (!req.body.signature) {
        throw crearErrorArgumentosInvalidos('req.body.signature', 'campo vacío')
    }
    return req.body.signature
}



const getRequestModel = async (req, searcher) => {
    const id = getIdFromRequest(req)
    const dataType = getDataTypeFromRequest(req)
    const data = getDataFromRequest(req)
    const signature = getSignatureFromRequest(req)
    const signatureDB = await searcher.searchData({ id, type: 'signature' })
    return { id, dataType, data, signature, signatureDB }
}


module.exports = { getRequestModel }