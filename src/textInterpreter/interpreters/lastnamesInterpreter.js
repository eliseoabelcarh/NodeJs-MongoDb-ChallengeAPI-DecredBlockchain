const { getLastnamesFromText } = require('../models/data')


const lastnamesInterpreter = (function () {

    let instance

    function create(textReader) {

        return {

            read: async (pathImage) => {
                const text = await textReader.readTextFromImage(pathImage)
                return getLastnamesFromText(text)
            }
        }
    }

    return {
        getInstance: function (textReader) {
            if (!instance) {
                instance = create(textReader)
            }
            return instance
        }
    }
}
)()


module.exports = lastnamesInterpreter