const textInterpreterFactory = require("./factory/textInterpreterFactory")


const crearTextInterpreter = () => {

    return {

        //según tipo de dato obtiene los datos de una cadena de texto
        readPath: async ({ type, path }) => {

            let interpreter = textInterpreterFactory.getInterpreter(type)
            return await interpreter.read(path)
        }
    }
}


module.exports = { crearTextInterpreter }