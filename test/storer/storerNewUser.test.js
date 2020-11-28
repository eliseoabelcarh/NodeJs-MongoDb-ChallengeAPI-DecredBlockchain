const daoFactory = require('../../src/dao/factory/daoFactory')
const storerNewUserFactory = require('../../src/storer/factories/storerNewUser')
const assert = require('assert')
const { crearUserModel } = require('../../src/models/modeloUser')

describe('TEST PARA STORER NEW USER', () => {

    let dao
    let storer

    before(() => {
        dao = daoFactory.getDao()
        storer = storerNewUserFactory.getInstance(dao)
    })
    afterEach(async () => {
        await dao.cleanAll()
    })

    describe('registro de usuario', () => {
        it('registro exitoso', async () => {
            const data = {
                id: 516,
                name: 'abel',
                lastname: 'carh',
                email: 'some@some.com',
                password: 'pass',
                signature: 'signature'
            }
            const user = crearUserModel(data)
            await storer.save(null, user)

        })
    })
})