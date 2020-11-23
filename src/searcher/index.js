const searcherFactory = require("./factories/searcherFactory")


const crearSearcher = (dao) => {

    return {

        searchData: async ({ id, type }) => {

            let searcher = searcherFactory.getInstance(type, dao)
            return await searcher.search(id)

        }
    }
}


module.exports = { crearSearcher }