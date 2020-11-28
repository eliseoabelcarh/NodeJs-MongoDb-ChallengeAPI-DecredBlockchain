const daoFactory = require('../../src/dao/factory/daoFactory')
const storerNewViewFactory = require('../../src/storer/factories/storerNewView')
const assert = require('assert')
const { crearViewModel } = require('../../src/models/modeloView')

const getRandom = () => {
    return Number.parseInt(Math.random() * (5000 - 100) + 100)
}
const randomId = getRandom()




const datosForView = { usersName: 'Abel', lastName: 'Carh' }
const datos = {
    id: randomId.toString(),
    data: { valid: true, view: datosForView }

}


describe('TEST PARA STORER NEW VIEW', () => {

    let dao
    let storer

    before(async () => {
        dao = daoFactory.getDaoViews()
        await dao.cleanAll()
        storer = storerNewViewFactory.getInstance(dao)
    })
    afterEach(async () => {
        await dao.cleanAll()
    })

    describe('agrego una view', () => {
        it('devuelve id esperado', async () => {
            const id = await storer.save(datos.id, datos.data)
            assert.deepStrictEqual(id, datos.id)

        })
    })
})