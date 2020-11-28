
const lastnamesInterpreter = require('../interpreters/lastnamesInterpreter')
const namesInterpreter = require('../interpreters/namesInterpreter')
const { crearImageTextReader } = require('../../imageTextReader')

const textInterpreterFactory = (function () {


    const textReader = crearImageTextReader()


    return {
        getInterpreter: function (type) {
            if (type === 'usersName') {
                return namesInterpreter.getInstance(textReader)
            }
            if (type === 'usersLastname') {
                return lastnamesInterpreter.getInstance(textReader)
            }
            else {
                throw new Error('no existe interprete')
            }
        }
    }
}
)()

module.exports = textInterpreterFactory