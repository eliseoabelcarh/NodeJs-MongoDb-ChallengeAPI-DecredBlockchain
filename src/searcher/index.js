const searcherFactory = require("./factories/searcherFactory")


const crearSearcher = () => {

    return {

        searchData: async ({ id, type }) => {

            let searcher = searcherFactory.getInstance(type)
            return await searcher.search(id)

        }
    }
}


module.exports = { crearSearcher }