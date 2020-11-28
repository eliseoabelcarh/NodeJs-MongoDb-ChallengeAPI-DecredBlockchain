const { crearErrorArgumentosInvalidos } = require('../errors/apiError')
const { getVerifyType } = require('./modeloUser')


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
const getTypesFromRequest = (req) => {
    checkBodyRequest(req)
    if (!req.body.types) {
        throw crearErrorArgumentosInvalidos('req.body.types', 'campo vacío')
    }
    if (!req.body.types.length) {
        throw crearErrorArgumentosInvalidos('req.body.types', 'array vacío')
    }
    return req.body.types
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



const getRequestModel = async (req) => {
    const id = getIdFromRequest(req)
    const dataType = getDataTypeFromRequest(req)
    let data = getDataFromRequest(req)
    const signature = getSignatureFromRequest(req)
    return { id, dataType, data, signature }
}


const getUserModelFromRequest = (req) => {
    checkBodyRequest(req)
    const user = {}
    if (!req.email) {
        throw crearErrorArgumentosInvalidos('req.body.email', 'campo vacío')
    } else {
        user.email = req.body.email
    }
    if (!req.name) {
        throw crearErrorArgumentosInvalidos('req.body.name', 'campo vacío')
    } else {
        user.name = req.body.name
    }
    if (!req.lastname) {
        throw crearErrorArgumentosInvalidos('req.body.lastname', 'campo vacío')
    } else {
        user.lastname = req.body.lastname
    }
    if (!req.password) {
        throw crearErrorArgumentosInvalidos('req.body.password', 'campo vacío')
    } else {
        user.password = req.body.password
    }
    if (!req.signature) {
        throw crearErrorArgumentosInvalidos('req.body.signature', 'campo vacío')
    } else {
        user.signature = req.body.signature
    }
    return user
}

const getApplyVerificationModel = (req) => {
    checkBodyRequest(req)
    const id = getIdFromRequest(req)
    const dataType = getDataTypeFromRequest(req)
    const signature = getSignatureFromRequest(req)//TODO encrypt this
    const verifiedType = getVerifyType(dataType)
    return { id, type: dataType, signature, verifiedType }
}


const checkVerifiedTypes = async (id, types, searcher) => {
    const verifiedTypes = []
    for (const type of types) {
        let verifiedType = getVerifyType(type)
        const isVerified = await searcher.searchData({ id, type: verifiedType })
        if (isVerified) {
            verifiedTypes.push(type)
        }
    }
    return verifiedTypes
}

const getCheckRequestModel = async (req, searcher) => {
    checkBodyRequest(req)
    const id = getIdFromRequest(req)
    const signature = getSignatureFromRequest(req)
    const types = getTypesFromRequest(req)
    const verifiedTypes = await checkVerifiedTypes(id, types, searcher)
    return { id, signature, types: verifiedTypes }
}

const getIdViewFromRequest = (req) => {
    if (!req) {
        throw crearErrorArgumentosInvalidos('req', 'campo vacío')
    }
    if (!req.query) {
        throw crearErrorArgumentosInvalidos('req.query', 'campo vacío')
    }
    if (!req.query.idView) {
        throw crearErrorArgumentosInvalidos('req.query.idView', 'campo vacío')
    }
    return req.query.idView
}

const getViewRequestModel = (req) => {
    return { idView: getIdViewFromRequest(req) }
}



module.exports = {
    getRequestModel,
    getUserModelFromRequest,
    getApplyVerificationModel,
    getCheckRequestModel,
    getViewRequestModel
}