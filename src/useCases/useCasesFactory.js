

const timestampFactory = require('../timestamp/factory/timestampFactory')
const hasherFactory = require('../hasher/factory/hasherFactory')
const { crearSearcher } = require('../searcher/index')
const daoFactory = require('../dao/factory/daoFactory')
const cuCheckerFactory = require('./cuCheckerFactory')
const cuStamperFactory = require('./cuStamperFactory')


const useCasesFactory = () => {


    const timestamp = timestampFactory.getInstance()
    const hasher = hasherFactory.getInstance()
    const dao = daoFactory.getDao()
    const searcher = crearSearcher(dao)

    return {

        cuChecker: () => {
            return cuCheckerFactory.getInstance(timestamp, hasher, searcher)
        },
        cuStamper: () => {
            return cuStamperFactory.getInstance(timestamp, hasher, searcher)
        },
        cuPainter: () => {

        }

    }


}