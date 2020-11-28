
const { crearErrorArgumentosInvalidos } = require('../errors/apiError')

let lastId = 0

const crearUserModel = (datos) => {
    let usuario = {}
    if (!datos) {
        throw crearErrorArgumentosInvalidos('datos', 'campo requerido')
    }
    if (!datos.name) {
        throw crearErrorArgumentosInvalidos('name', 'campo requerido')
    }
    else {
        usuario.name = datos.name
    }
    if (!datos.lastname) {
        throw crearErrorArgumentosInvalidos('lastname', 'campo requerido')
    }
    else {
        usuario.lastname = datos.lastname
    }
    if (!datos.email) {
        throw crearErrorArgumentosInvalidos('email', 'campo requerido')
    }
    else {
        usuario.email = datos.email
    }
    if (!datos.password) {
        throw crearErrorArgumentosInvalidos('password', 'campo requerido')
    }
    else {
        usuario.password = datos.password
    }
    if (!datos.signature) {
        throw crearErrorArgumentosInvalidos('signature', 'campo requerido')
    }
    else {
        usuario.signature = datos.signature
    }
    if (!datos.photoIdFrontPath) {
        usuario.photoIdFrontPath = null
    }
    if (datos.photoIdFrontPath) {
        usuario.photoIdFrontPath = datos.photoIdFrontPath
    }
    if (!datos.photoIdFrontPathThumb) {
        usuario.photoIdFrontPathThumb = null
    }
    if (datos.photoIdFrontPathThumb) {
        usuario.photoIdFrontPathThumb = datos.photoIdFrontPathThumb
    }
    if (!datos.photoIdFrontBinary) {
        usuario.photoIdFrontBinary = null
    }
    if (datos.photoIdFrontBinary) {
        usuario.photoIdFrontBinary = datos.photoIdFrontBinary
    }
    if (!datos.photoIdFrontBinaryThumb) {
        usuario.photoIdFrontBinaryThumb = null
    }
    if (datos.photoIdFrontBinaryThumb) {
        usuario.photoIdFrontBinaryThumb = datos.photoIdFrontBinaryThumb
    }
    if (datos.verifiedName === true || datos.verifiedName === false) {
        usuario.verifiedName = datos.verifiedName
    }
    else {
        usuario.verifiedLastname = null
    }
    if (datos.verifiedLastname === true || datos.verifiedLastname === false) {
        usuario.verifiedLastname = datos.verifiedLastname
    }
    else {
        usuario.verifiedLastname = null
    }
    //TODO check length of database
    if (!datos.id) {
        const idCreado = lastId + 1
        usuario.id = idCreado
    }
    else {
        usuario.id = datos.id
    }


    return usuario
}

const crearUsersModelList = (array) => {

    let collection = []
    for (const userModel of array) {
        const user = crearUserModel(userModel)
        collection.push(user)
    }
    return collection
}
const getVerifyType = (dataType) => {

    if (dataType === 'usersName') {
        return 'verifiedName'
    }
    if (dataType === 'usersLastname') {
        return 'verifiedLastname'
    }
    throw crearErrorArgumentosInvalidos('verifiedType', 'debe existir')
}


const signatureMatch = (signatureDB, signature) => {
    if (signatureDB !== signature) {
        throw crearErrorArgumentosInvalidos('sigantureDb and signature', 'doesnt match')
    }
    return true
}
const dataMatch = (dataDB, data) => {
    if (dataDB !== data) {
        throw crearErrorArgumentosInvalidos('dataDb and data', 'doesnt match')
    }
    return true
}


module.exports = { crearUserModel, crearUsersModelList, signatureMatch, dataMatch, getVerifyType }