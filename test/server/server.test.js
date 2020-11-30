const assert = require('assert')
const { crearClienteRest } = require('../../src/clienteRest')
const daoFactory = require('../../src/dao/factory/daoFactory')
const { createServer } = require('../../src/server/server')
const fs = require('fs').promises
const fss = require('fs')

const pathImage = './src/assets/dniPhoto.jpg'

const getBinary = async (pathImage) => {
    const data = await fs.readFile(pathImage, "binary");
    return new Buffer.from(data, 'binary')
}
const getBase64 = async (pathImage) => {
    const data = await fs.readFile(pathImage, "binary");
    return new Buffer.from(data, 'binary').toString('base64')
}
const getRandomSignature = () => {
    const min = 1000
    const max = 999999
    return (Number.parseInt(Math.random() * (max - min) + min)).toString()
}

describe('TEST PARA SERVER Y USE CASES', async () => {


    let server
    let clienteRest
    let dao

    beforeEach(async () => {
        server = await createServer({})
        clienteRest = crearClienteRest(server.address().port)
        dao = await daoFactory.getDao()
        await dao.cleanAll()
    })

    afterEach(async () => {
        await server.close()
        await dao.cleanAll()
    })

    after(() => {
        fss.rmdirSync('./src/uploads/', { recursive: true })

    })
    describe('first testing to GET de ruta Api', async () => {
        it('devuelve status 200 y mensaje okay', async () => {
            const response = await clienteRest.testApiRoute()
            assert.deepStrictEqual(200, response.status)
            assert.deepStrictEqual('okay', response.data)
        })
    })


    describe('llamamos al id de la vista generada para poder ver los datos compartidos', async () => {
        it('devuelve status 200 y devuelve un json con datos compartidos y que están verificados', async () => {
            //randomSignature para no stampar en blockchain los mismos datos


            //REGISTRAMOS A USUARIO - 
            const randomSignature = getRandomSignature()

            const user = {
                name: 'JAMIE FALKLAND',
                lastname: 'ANDERSON',
                email: 'some@some.com',
                password: 'pass',
                signature: randomSignature
            }
            let { status, data } = await clienteRest.registrar(user)
            assert.deepStrictEqual(200, status)


            //CARGAMOS PHOTOID FRONT DE USUARIO 
            const idUser = data.id
            const datos = {
                dataType: 'photoIdFrontBinary',
                data: await getBase64(pathImage),// binary en base64
                signature: randomSignature,
            }
            let response = await clienteRest.cargarPhotoId(idUser, datos)
            assert.deepStrictEqual(200, response.status)
            assert.deepStrictEqual(0, response.data.result)


            //SOLICITAMOS VERIFICACION DE DATO( EJEMPLO: NOMBRES ) UNO POR VEZ 
            const datosToVerify = {
                dataType: 'usersName',
                signature: randomSignature,
            }
            let response2 = await clienteRest.solicitarVerificacion(idUser, datosToVerify)
            assert.deepStrictEqual(200, response2.status)
            //true significa que se procesó y se verificó en BD, tardará tiempo en blockchain
            assert.deepStrictEqual(true, response2.data.result)

            const datosToVerify2 = {
                dataType: 'usersLastname',
                signature: randomSignature,
            }
            let response3 = await clienteRest.solicitarVerificacion(idUser, datosToVerify2)
            assert.deepStrictEqual(200, response3.status)
            //true significa que se procesó y se verificó en BD, tardará tiempo en blockchain
            assert.deepStrictEqual(true, response3.data.result)


            // ELEGIMOS QUE DATOS NUESTROS COMPARTIR, GENERAMOS UN ID DE VISTA
            // sólo se compartirá los datos verificados
            const toShare = {
                signature: randomSignature,
                types: ['usersName', 'usersLastname'],
            }
            let response4 = await clienteRest.compartirDatos(idUser, toShare)
            assert.deepStrictEqual(200, response4.status)
            //devuelve el id de la vista generada, válida para ser consultada una sola vez
            //console.log(response4.data.viewId)


            //UTILIZAMOS EL ID DE LA VISTA RECIBIDA PARA CONSULTAR LOS DATOS COMPARTIDOS
            const idVista = response4.data.viewId
            let response5 = await clienteRest.verDatosCompartidos(idVista)
            assert.deepStrictEqual(200, response5.status)
            const esperado = { usersName: 'JAMIE FALKLAND', usersLastname: 'ANDERSON' }
            assert.deepStrictEqual(esperado, response5.data)


        })
    })






})





