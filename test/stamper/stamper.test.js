const assert = require('assert')
const fs = require('fs')
const timestampFactory = require('../../src/timestamp/factory/timestampFactory')
const hasherFactory = require('../../src/hasher/factory/hasherFactory')
const { crearStamper } = require('../../src/stamper')



const getRandom = () => {
    return Number.parseInt(Math.random() * (5000 - 100) + 100)
}
const randomId = getRandom()


describe('TEST PARA STAMPER ', async () => {

    let timestamp
    let hasher
    let stamper

    before(() => {
        timestamp = timestampFactory.getInstance()
        hasher = hasherFactory.getInstance()
        stamper = crearStamper(timestamp, hasher)
    })
    describe('stampeamos algo que no existe en la blockchain', async () => {
        it('devuelve esperado 0 / success', async () => {

            const data = fs.readFileSync('./src/assets/logo.jpg')
            const forHash = {
                0: randomId,
                1: 'PIN4digits',
                2: data
            }
            const res = await stamper.stamp(forHash)
            assert.deepStrictEqual(0, res)
        })
    })
    describe('stampeamos algo que YA existe en la blockchain', async () => {
        it('devuelve esperado error con 1 / ya existe', async () => {

            const forHash1 = {
                0: 123,
                1: 'PIN4digits',
                2: 'ABEL'
            }
            //hash1 guardado en blockchain
            //7de12a0c1e8851b78884cf34705525d23f8fd1b13d3d53ae02d04ac5f1d40fe0
            const forHash2 = {
                0: 123,
                1: 'PIN4digits',
                2: 'CARH'
            }
            //hash2 guardado en blockchain
            //66d6ccab8d11d0a67230441659b8c6e0bf5c79f74fa2cd37f5ec153c75d443a5

            await assert.rejects(async () => {
                await stamper.stamp(forHash1)
            }, error => {
                const esperado = 'stamp no exitoso, resultado fue: 1'
                assert.deepStrictEqual(esperado, error.message)
                return true
            })
            await assert.rejects(async () => {
                await stamper.stamp(forHash2)
            }, error => {
                const esperado = 'stamp no exitoso, resultado fue: 1'
                assert.deepStrictEqual(esperado, error.message)
                return true
            })
        })
    })
})