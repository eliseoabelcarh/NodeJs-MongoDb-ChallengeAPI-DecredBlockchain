const { crearErrorArgumentosInvalidos } = require("../errors/apiError")

//MODELO: const forHash = {0: userId,1: signature,2: data}

const crearModeloForHash = ({ id, data, signature, signatureDB }) => {
    const forHash = {}
    if (!signature) {
        throw crearErrorArgumentosInvalidos('signature modeloForHash', 'campo vacío')
    }
    if (!signatureDB) {
        throw crearErrorArgumentosInvalidos('signatureDB modeloForHash', 'campo vacío')
    }
    if (!id) {
        throw crearErrorArgumentosInvalidos('id modeloForHash', 'campo vacío')
    }
    if (!data) {
        throw crearErrorArgumentosInvalidos('data modeloForHash', 'campo vacío')
    }
    if (signature !== signatureDB) {
        throw crearErrorArgumentosInvalidos('signature y signatureDB', 'no coinciden')
    }
    forHash[0] = id
    forHash[1] = signature
    forHash[2] = data
    return forHash
}

module.exports = {
    crearModeloForHash
}