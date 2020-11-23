
/**
* @typedef STATUS RESPONSES: /api/verificarDni/:id
* @description Respuestas de Servidor
* @property {'400'} STATUS INVALID_ARGS - Error en cliente
* @property {'404'} STATUS NOT_FOUND - Recurso no encontrado
* @property {'500'} STATUS INTERNAL_ERROR - Error en Servidor
* @property {'520'} STATUS undefined Otro error
*/


function errorHandler(error, req, res, next) {
    if (error.type === 'INVALID_ARGS') {
        res.status(400)
    } else if (error.type === 'NOT_FOUND') {
        res.status(404)
    } else if (error.type === 'INTERNAL_ERROR') {
        res.status(500)
    } else {
        res.status(520)
    }
    res.json({ message: error.message })
}


module.exports = { errorHandler }