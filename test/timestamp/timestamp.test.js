

const timestampFactory = require('../../src/timestamp/factory/timestampFactory')
const assert = require('assert')

describe('TEST PARA TIMESTAMP ', async () => {

    let timestamp

    before(() => {
        timestamp = timestampFactory.getInstance()
    })
    describe('timestampeamos algo que ya existe en la blockchain', async () => {
        it('devuelve esperado', async () => {

            const id = 'dcrtime cli'
            const digest = 'd412ba345bc44fb6fbbaf2db9419b648752ecfcda6fd1aec213b45a5584d1b13'
            const resultEsperado = 1
            const idEsperado = 'dcrtime cli'
            const digestEsperado = 'd412ba345bc44fb6fbbaf2db9419b648752ecfcda6fd1aec213b45a5584d1b13'
            const res = await timestamp.timestampOne({ id, digest })
            assert.deepStrictEqual(resultEsperado, res.data.results[0])
            assert.deepStrictEqual(idEsperado, res.data.id)
            assert.deepStrictEqual(digestEsperado, res.data.digests[0])
        })
    })
    describe('verificamos algo que ya existe en la blockchain', async () => {
        it('devuelve esperado', async () => {

            const id = 'dcrtime cli'
            const digest = 'd412ba345bc44fb6fbbaf2db9419b648752ecfcda6fd1aec213b45a5584d1b13'
            const resultEsperado = 0
            const idEsperado = 'dcrtime cli'
            const digestEsperado = 'd412ba345bc44fb6fbbaf2db9419b648752ecfcda6fd1aec213b45a5584d1b13'
            const res = await timestamp.verifyOne({ id, digest })


        })
    })
})