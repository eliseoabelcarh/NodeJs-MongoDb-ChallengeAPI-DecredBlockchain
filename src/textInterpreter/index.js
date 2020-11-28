const textInterpreterFactory = require("./factory/textInterpreterFactory")


const crearTextInterpreter = () => {

    return {

        readPath: async ({ type, path }) => {

            let interpreter = textInterpreterFactory.getInterpreter(type)
            return await interpreter.read(path)
        }
    }
}


module.exports = { crearTextInterpreter }