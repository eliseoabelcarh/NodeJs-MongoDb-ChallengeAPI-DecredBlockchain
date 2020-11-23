
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
    if (!datos.id) {
        const idCreado = lastId + 1
        usuario.id = idCreado
    }
    else {
        usuario.id = datos.id
    }
    if (datos.photoIdFront) {
        usuario.photoIdFront = datos.photoIdFront
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


module.exports = { crearUserModel, crearUsersModelList }