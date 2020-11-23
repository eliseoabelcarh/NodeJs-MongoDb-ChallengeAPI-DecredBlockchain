const assert = require('assert')
const fs = require('fs')
const timestampFactory = require('../../src/timestamp/factory/timestampFactory')
const hasherFactory = require('../../src/hasher/factory/hasherFactory')
const { crearStamper } = require('../../src/stamper')


describe('TEST PARA STAMPER ', async () => {

    let timestamp
    let hasher
    let stamper

    before(() => {
        timestamp = timestampFactory.getInstance()
        hasher = hasherFactory.getInstance()
        stamper = crearStamper(timestamp, hasher)
    })
    describe('stampeamos algo que ya existe en la blockchain', async () => {
        it('devuelve esperado 0 / success', async () => {

            const data = fs.readFileSync('./src/assets/logo.jpg')
            const forHash = {
                0: 516,//cambiar
                1: 'PIN4digits',
                2: data
            }
            const res = await stamper.stamp(forHash)
            console.log('en TEST STAMPER: ', res)
        })
    })
})