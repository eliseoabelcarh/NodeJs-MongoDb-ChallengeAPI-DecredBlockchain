const searcherFactory = require("./factories/searcherFactory")


const crearSearcher = () => {

    return {

        //id es id de usuario
        // type: es tipo de dato a buscar en base de datos
        searchData: async ({ id, type }) => {

            let searcher = searcherFactory.getInstance(type)
            return await searcher.search(id)

        }
    }
}


module.exports = { crearSearcher }