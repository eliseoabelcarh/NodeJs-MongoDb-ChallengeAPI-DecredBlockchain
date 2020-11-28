const daoFactory = require('../../src/dao/factory/daoFactory')
const { crearUpdater } = require('../../src/updater/index')
const assert = require('assert')
const fs = require('fs').promises;


const getBinary = async () => {
    const data = await fs.readFile('./src/assets/logo.jpg', "binary");
    return new Buffer.from(data, 'binary')
}
const getBase64 = async () => {
    const data = await fs.readFile('./src/assets/logo.jpg', "binary");
    return new Buffer.from(data, 'binary').toString('base64')

}


const user = {
    id: 289465,
    name: 'abel',
    lastname: 'carh',
    email: 'some@some.com',
    password: 'pass',
    signature: 'signature',
}
const data2 = {

    photoIdFrontPath: './something',
    photoIdFrontPathThumb: './thumb',
    photoIdFrontBinary: null,
    photoIdFrontBinaryThumb: null,
    verifiedName: true,
    verifiedLastname: false,

}


describe('TEST PARA UPDATERS', () => {

    let dao
    let updater
    let id

    before(async () => {

        dao = daoFactory.getDao()
        await dao.cleanAll()
        updater = crearUpdater()
        id = await dao.addUser(user)
    })

    after(async () => {
        await dao.cleanAll()
    })
    describe('envío a updater a update photoIdFrontPath', () => {
        it('devuelve lo esperado', async () => {
            //llega binary - anda perfecto en /uploads
            const recibido = await updater.updateData({ id, type: 'photoIdFrontPath', data: await getBinary() })
            assert.deepStrictEqual(recibido, true)
        })
    })
    describe('envío a updater a update photoIdFrontPathThumb', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await updater.updateData({ id, type: 'photoIdFrontPathThumb', data: data2.photoIdFrontPathThumb })
            assert.deepStrictEqual(recibido, true)
        })
    })
    describe('envío a updater a update photoIdFrontBinary', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await updater.updateData({ id, type: 'photoIdFrontBinary', data: data2.photoIdFrontBinary })
            assert.deepStrictEqual(recibido, true)
        })
    })
    describe('envío a updater a update photoIdFrontBinaryThumb', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await updater.updateData({ id, type: 'photoIdFrontBinaryThumb', data: data2.photoIdFrontBinaryThumb })
            assert.deepStrictEqual(recibido, true)
        })
    })
    describe('envío a updater a update verifiedName', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await updater.updateData({ id, type: 'verifiedName', data: data2.verifiedName })
            assert.deepStrictEqual(recibido, true)
        })
    })
    describe('envío a updater a update verifiedLastname', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await updater.updateData({ id, type: 'verifiedLastname', data: data2.verifiedLastname })
            assert.deepStrictEqual(recibido, true)
        })
    })

})