const { getNamesFromText } = require('../models/data')


const namesInterpreter = (function () {

    let instance

    function create(textReader) {

        return {

            read: async (pathImage) => {
                const text = await textReader.readTextFromImage(pathImage)
                return getNamesFromText(text)
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


module.exports = namesInterpreter