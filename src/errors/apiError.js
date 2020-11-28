
function crearErrorDeBaseDeDatos(operacion) {
    const errMsg = 'error de cnx a la base'
    const err = new Error(`${operacion} - ${errMsg}`)
    err.type = 'INTERNAL_ERROR'
    return err
}

function crearErrorArgumentosInvalidos(campo, regla) {
    const errMsg = `${campo}: ${regla}`
    const error = new Error(errMsg)
    error.type = 'INVALID_ARGS'
    return error
}

function crearErrorRecursoNoEncontrado(recurso, id) {
    const errMsg = `no se encontró '${recurso}' con id: ${id}`
    const error = new Error(errMsg)
    error.type = 'NOT_FOUND'
    return error
}
function crearErrorEnModulo(modulo) {
    const errMsg = 'error en módulo'
    const err = new Error(`${modulo} - ${errMsg}`)
    err.type = 'INTERNAL_ERROR'
    return err
}

module.exports = {
    crearErrorDeBaseDeDatos,
    crearErrorArgumentosInvalidos,
    crearErrorRecursoNoEncontrado,
    crearErrorEnModulo
}