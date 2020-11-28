const timestampConfig = require('../configs/timestampConfig')
const axios = require('axios')

const timestampFactory = (function () {

    let instance

    function create() {

        const baseURL = timestampConfig.getBaseURL()
        const network = timestampConfig.getNetworkPort()
        const versionAPI = timestampConfig.getVersionAPI()

        return {
            timestampOne: async ({ id, digest }) => {
                const url = `${baseURL}:${network}/${versionAPI}/timestamp/`
                const idX = id.toString()
                const data = { id: idX, "digests": [digest] }
                const res = await axios.post(url, data)
                return res
            },
            verifyOne: async ({ id, digest }) => {
                const url = `https://time.decred.org:${network}/${versionAPI}/verify/`
                const idX = id.toString()
                const data = { id: idX, "digests": [digest], "timestamps": null }
                const res = await axios.post(url, data)
                //console.log('Resultado Verificación: ', res)
                return res
            }
        }
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = create()
            }
            return instance
        }
    }
}
)()

module.exports = timestampFactory