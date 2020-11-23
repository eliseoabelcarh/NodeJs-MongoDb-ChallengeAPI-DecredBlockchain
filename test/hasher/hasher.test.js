const hasherFactory = require('../../src/hasher/factory/hasherFactory')
const assert = require('assert')

describe('TEST PARA HASHER ', () => {

    let hasher

    before(() => {
        hasher = hasherFactory.getInstance()
    })
    describe('hasheamos un string', () => {
        it('devuelve esperado', () => {
            const data = 'Encripta datos con sha256'
            const esperado = '880fd8775d12cf3dd4f63a53329e95f2261e0d813309f58d832b1a6cf1d6a9cd'
            const res = hasher.hash({ data })
            assert.deepStrictEqual(esperado, res)
        })
    })
})