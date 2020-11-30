const express = require('express')
const useCasesFactory = require('../useCases/useCasesFactory')
const { crearErrorArgumentosInvalidos } = require('../errors/apiError')


let wrap = fn => (...args) => fn(...args).catch(args[2])

function crearRouterHandler() {

    router = express.Router()


    //rita para alta de usuarios nuevos
    router.post('/users', wrap(async (req, res) => {
        const cu = useCasesFactory.cuRegister()
        const userId = await cu.register(req)
        res.status(200).json({ id: userId })
    }))

    //ruta para carga de imágenes con id de usuario
    router.post('/photos/:id', wrap(async (req, res) => {
        const cu = useCasesFactory.cuStamper()
        const result = await cu.stamp(req)
        res.status(200).json({ result })
    }))

    //ruta para solicitar la verificación de datos por id de usuario
    router.post('/verifications/:id', wrap(async (req, res) => {
        const cu = useCasesFactory.cuVerification()
        const result = await cu.apply(req)
        res.status(200).json({ result })
    }))

    //ruta para enviar datos que se desea compartir con otra persona
    router.post('/shares/:id', wrap(async (req, res) => {
        const cu = useCasesFactory.cuChecker()
        const viewId = await cu.check(req)
        res.status(200).json({ viewId })
    }))

    //ruta para visualizar los datos compartidos
    //requerido una idView como query
    router.get('/identities', wrap(async (req, res) => {
        const cu = useCasesFactory.cuViewer()
        const view = await cu.getView(req)
        res.status(200).json(view)
    }))

    //ruta de prueba para api
    router.get('', wrap(async (req, res) => {
        res.status(200).send('okay')
    }))

    return router
}


module.exports = { crearRouterHandler }