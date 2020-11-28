const daoFactory = require('../../src/dao/factory/daoFactory');
const useCasesFactory = require('../../src/useCases/useCasesFactory')
const fs = require('fs').promises
const assert = require('assert')



const pathImage = './src/assets/logo.jpg'

const getBinary = async (pathImage) => {
    const data = await fs.readFile(pathImage, "binary");
    return new Buffer.from(data, 'binary')
}
const getBase64 = async (pathImage) => {
    const data = await fs.readFile(pathImage, "binary");
    return new Buffer.from(data, 'binary').toString('base64')
}

const decodeBase64ToBinary = (data) => {
    return new Buffer.from(data, 'base64');//no agregar .toString()
}


const getRandom = () => {
    return Number.parseInt(Math.random() * (5000 - 100) + 100)
}
const getRandomSignature = () => {
    const min = 1000
    const max = 999999
    return (Number.parseInt(Math.random() * (max - min) + min)).toString()
}

const randomId = getRandom()

const data = {
    id: randomId,
    name: 'abel',
    lastname: 'carh',
    email: 'some@some.com',
    password: 'pass',
    signature: 'signature',

}

describe('TEST PARA USE CASE STAMPER', () => {
    let cu
    let dao
    before(async () => {
        dao = daoFactory.getDao()
        await dao.cleanAll()
        cu = useCasesFactory.cuStamper()
    })
    afterEach(async () => {
        await dao.cleanAll()
    })

    describe('recibimos un request de servidor con foto dni en body', () => {

        it('stampamos en blockchain y reiniciamos valores en bd', async () => {
            const req = {
                params: { id: randomId },
                body: {
                    dataType: 'photoIdFrontBinary',
                    data: await getBase64(pathImage),// binary en base64
                    signature: 'signature',
                }
            }
            await dao.addUser(data)
            const res = await cu.stamp(req)
            assert.deepStrictEqual(0, res)

        })
    })

})



describe('TEST PARA USE CASE VERIFICATION', () => {
    let cu
    let dao
    before(async () => {
        dao = daoFactory.getDao()
        await dao.cleanAll()
        cu = useCasesFactory.cuVerification()
    })
    afterEach(async () => {
        await dao.cleanAll()
    })

    describe('recibimos un request de servidor para stampear en blockchain', () => {

        it('stampamos en blockchain y seteamos verificación en bd', async () => {
            const req = {
                params: { id: randomId },
                body: {
                    dataType: 'usersName',
                    signature: 'signature',
                }
            }
            const data = {
                id: randomId,
                name: 'JAMIE FALKLAND',
                lastname: 'ANDERSON',
                email: 'some@some.com',
                password: 'pass',
                signature: 'signature',

            }
            await dao.addUser(data)
            const path = './src/assets/dniPhoto.jpg'
            await dao.updatePhotoIdFrontPathById(req.params.id, path)
            const res = await cu.apply(req)
            const verified = await dao.getVerifiedNameById(req.params.id)
            assert.deepStrictEqual(true, res)
            assert.deepStrictEqual(true, verified)

        })
    })

})



describe('TEST PARA USE CASE CHECKER', () => {
    let cu
    let dao

    before(async () => {
        dao = daoFactory.getDao()
        await dao.cleanAll()
        cu = useCasesFactory.cuChecker()
    })
    afterEach(async () => {
        await dao.cleanAll()
    })

    describe('recibimos un request con data para compartir por usuario para verificar en blockchain', () => {

        it('verificamos que datos ya esten guardados en blockhain', async () => {
            //data ya stamped en blockchain
            const user = {
                id: 123,
                name: 'ABEL',
                lastname: 'CARH',
                email: 'some@some.com',
                password: 'pass',
                signature: 'PIN4digits',
            }
            const req = {
                params: { id: 123 },//de user
                body: {
                    signature: 'PIN4digits',
                    types: ['usersName', 'usersLastname'],
                }
            }
            await dao.addUser(user)
            await dao.updateVerifiedNameById(user.id, true)
            await dao.updateVerifiedLastnameById(user.id, true)
            const res = await cu.check(req)
            //devuelve un hash único - será utilizado como id en la url de views

        })
    })

})



describe('TEST PARA USE CASE VIEWER', () => {
    let cu
    let dao

    before(async () => {
        dao = daoFactory.getDaoViews()
        await dao.cleanAll()
        cu = useCasesFactory.cuViewer()
    })
    afterEach(async () => {
        await dao.cleanAll()
    })

    describe('recibimos un request con solicitud de una view en estado válida', () => {

        it('se recibe vista válida en json ', async () => {
            const view = {
                id: 'hashxveryxbigxhashxveryxbigxhashxverybigxhashxveryxigx',
                valid: true,
                view: { usersName: 'ABEL', usersLastname: 'CARH' }
            }
            const req = {
                query: { idView: view.id }
            }
            await dao.addView(view.id, view.valid, view.view)
            const viewRecibida = await cu.getView(req)
            assert.deepStrictEqual(view.view, viewRecibida)
            //devuelve un hash único - será utilizado como id en la url de views

        })
    })
    describe('llamamos a la misma vista dos veces', () => {

        it('la segunda vez lanza error porque ya no es válida', async () => {
            const view = {
                id: 'anotherxhashxveryxbigxhashxveryxbigxhashxverybigxhashxveryxigx',
                valid: true,
                view: { usersName: 'ABEL', usersLastname: 'CARH' }
            }
            const req = {
                query: { idView: view.id }
            }
            await dao.addView(view.id, view.valid, view.view)

            const viewRecibida = await cu.getView(req)
            assert.deepStrictEqual(view.view, viewRecibida)

            await assert.rejects(async () => {
                await cu.getView(req)
            }, error => {
                assert.deepStrictEqual('INVALID_ARGS', error.type)
                return true
            })

        })
    })

})