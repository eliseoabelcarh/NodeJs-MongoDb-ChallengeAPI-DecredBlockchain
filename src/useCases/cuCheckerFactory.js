const { crearChecker } = require("../checker")
const { getIdFromRequest, getDataTypeFromRequest } = require('../models/modeloRequestServer')


const cuCheckerFactory = (function () {

    let instance

    function create(timestamp, hasher, searcher) {

        const checker = crearChecker(timestamp, hasher, searcher)

        return {
            check: (req) => {
                const id = getIdFromRequest(req)
                const type = getDataTypeFromRequest(req)
                return await checker.check({ id, type })
            }
        }
    }

    return {
        getInstance: function (timestamp, hasher, searcher) {
            if (!instance) {
                instance = create(timestamp, hasher, searcher)
            }
            return instance
        }
    }
}
)()

module.exports = cuCheckerFactory