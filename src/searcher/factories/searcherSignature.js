

const searcherSignatureFactory = (function () {

    let instance

    function create(dao) {


        return {
            search: async (id) => {
                return await dao.getSignatureById(id)
            }
        }

    }

    return {
        getInstance: function (dao) {
            if (!instance) {
                instance = create(dao)
            }
            return instance
        }
    }
}
)()

module.exports = searcherSignatureFactory