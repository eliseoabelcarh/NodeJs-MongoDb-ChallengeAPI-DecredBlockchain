const { crearErrorArgumentosInvalidos } = require('../errors/apiError')

let lastId = 0

const crearViewModel = (datos) => {
    let view = {}
    if (!datos) {
        throw crearErrorArgumentosInvalidos('datos', 'campo requerido')
    }
    //TODO check length of database
    if (!datos.id) {
        const idCreado = lastId + 1
        view.id = idCreado
    }
    else {
        view.id = datos.id
    }

    if (datos.valid === true || datos.valid === false) {
        view.valid = datos.valid
    }
    else {
        view.valid = null
    }
    if (!datos.view) {
        throw crearErrorArgumentosInvalidos('datos.view', 'campo requerido')
    }
    else {
        view.view = datos.view
    }

    return view
}



const crearOneTimeViewModel = async (datosForView, storer, hasher) => {
    const key = new Date().toString() + JSON.stringify(datosForView)
    const idForView = hasher.hash({ data: key })
    const idForViewSaved = await storer.storeData({ id: idForView, type: 'newView', data: { valid: true, view: datosForView } })
    return idForViewSaved
}


module.exports = { crearOneTimeViewModel, crearViewModel }