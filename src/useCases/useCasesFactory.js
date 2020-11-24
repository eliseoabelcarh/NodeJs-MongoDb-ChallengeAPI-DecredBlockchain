const timestampFactory = require('../timestamp/factory/timestampFactory')
const hasherFactory = require('../hasher/factory/hasherFactory')
const { crearSearcher } = require('../searcher')
const { crearStorer } = require('../storer')
const cuCheckerFactory = require('./cuCheckerFactory')
const cuStamperFactory = require('./cuStamperFactory')


const useCasesFactory = () => {


    const timestamp = timestampFactory.getInstance()
    const hasher = hasherFactory.getInstance()

    const storer = crearStorer()
    const searcher = crearSearcher()

    return {

        cuChecker: () => {
            return cuCheckerFactory.getInstance(timestamp, hasher, searcher)
        },
        cuStamper: () => {
            return cuStamperFactory.getInstance(timestamp, hasher, searcher, storer)
        },
        cuPainter: () => {

        }

    }


}

module.exports = useCasesFactory