
const CryptoJS = require('crypto-js');



const hasherFactory = (function () {

    let instance

    function create() {

        return {
            //hash de datos con SHA256
            //data ingresa como archivo de imagen o string
            hash: ({ data }) => {
                return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex)
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

module.exports = hasherFactory


