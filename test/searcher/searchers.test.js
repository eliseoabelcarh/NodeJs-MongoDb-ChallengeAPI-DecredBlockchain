const daoFactory = require('../../src/dao/factory/daoFactory')
const { crearSearcher } = require('../../src/searcher/index')
const assert = require('assert')
const fs = require('fs')


const binary = new Buffer.from('./src/assets/logo.jpg')
const binaryThumb = new Buffer.from('./src/assets/logo.jpg')

const data = {
    id: 8389465,
    name: 'abel',
    lastname: 'carh',
    email: 'some@some.com',
    password: 'pass',
    signature: 'signature',
    photoIdFrontPath: './something',
    photoIdFrontPathThumb: './thumb',
    photoIdFrontBinary: binary,
    photoIdFrontBinaryThumb: binaryThumb,
    verifiedName: false,
    verifiedLastname: false,

}


describe('TEST PARA SEARCHERS', () => {

    let dao
    let searcher
    let id

    before(async () => {

        dao = daoFactory.getDao()
        await dao.cleanAll()
        searcher = crearSearcher()
        id = await dao.addUser(data)
    })

    after(async () => {
        await dao.cleanAll()
    })

    describe('envío a searcher a traer name', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await searcher.searchData({ id, type: 'usersName' })
            assert.deepStrictEqual(recibido, data.name)
        })
    })
    describe('envío a searcher a traer lastname', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await searcher.searchData({ id, type: 'usersLastname' })
            assert.deepStrictEqual(recibido, data.lastname)
        })
    })
    describe('envío a searcher a traer signature', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await searcher.searchData({ id, type: 'signature' })
            assert.deepStrictEqual(recibido, data.signature)
        })
    })
    describe('envío a searcher a traer photoIdFrontPath', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await searcher.searchData({ id, type: 'photoIdFrontPath' })
            assert.deepStrictEqual(recibido, data.photoIdFrontPath)
        })
    })
    describe('envío a searcher a traer photoIdFrontPathThumb', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await searcher.searchData({ id, type: 'photoIdFrontPathThumb' })
            assert.deepStrictEqual(recibido, data.photoIdFrontPathThumb)
        })
    })
    describe('envío a searcher a traer photoIdFrontBinary', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await searcher.searchData({ id, type: 'photoIdFrontBinary' })
            assert.deepStrictEqual(true, data.photoIdFrontBinary.equals(recibido))
        })
    })
    describe('envío a searcher a traer photoIdFrontBinaryThumb', () => {
        it('devuelve lo esperado', async () => {
            const recibido = await searcher.searchData({ id, type: 'photoIdFrontBinaryThumb' })
            assert.deepStrictEqual(true, data.photoIdFrontBinaryThumb.equals(recibido))
        })
    })
    describe('envío a searcher a traer verifiedName', () => {
        it('devuelve lo esperado', async () => {

            const recibido = await searcher.searchData({ id, type: 'verifiedName' })
            assert.deepStrictEqual(recibido, data.verifiedName)
        })
    })
    describe('envío a searcher a traer verifiedLastname', () => {
        it('devuelve lo esperado', async () => {

            const recibido = await searcher.searchData({ id, type: 'verifiedLastname' })
            assert.deepStrictEqual(recibido, data.verifiedLastname)
        })
    })

})