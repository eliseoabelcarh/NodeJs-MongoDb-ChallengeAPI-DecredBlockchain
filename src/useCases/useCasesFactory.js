const timestampFactory = require('../timestamp/factory/timestampFactory')
const hasherFactory = require('../hasher/factory/hasherFactory')
const { crearSearcher } = require('../searcher')
const { crearStorer } = require('../storer')
const { crearUpdater } = require('../updater')
const { crearStamper } = require('../stamper')
const { crearChecker } = require('../checker')
const { crearTextInterpreter } = require('../textInterpreter')

const cuCheckerFactory = require('./cuCheckerFactory')
const cuStamperFactory = require('./cuStamperFactory')
const cuRegisterFactory = require('./cuRegisterFactory')
const cuVerificationFactory = require('./cuVerificationFactory')
const cuViewerFactory = require('./cuViewerFactory')


const timestamp = timestampFactory.getInstance()
const hasher = hasherFactory.getInstance()

const storer = crearStorer()
const searcher = crearSearcher()
const updater = crearUpdater()
const textInterpreter = crearTextInterpreter()

const stamper = crearStamper(timestamp, hasher)
const checker = crearChecker(timestamp, hasher, searcher)

const useCasesFactory = {

    cuRegister: () => {
        return cuRegisterFactory.getInstance(storer)
    },
    cuStamper: () => {
        return cuStamperFactory.getInstance(searcher, updater, stamper)
    },
    cuVerification: () => {
        return cuVerificationFactory.getInstance(searcher, textInterpreter, stamper, updater)
    },
    cuChecker: () => {
        return cuCheckerFactory.getInstance(checker, hasher, searcher, storer)
    },
    cuViewer: () => {
        return cuViewerFactory.getInstance(searcher, updater)
    }

}

module.exports = useCasesFactory