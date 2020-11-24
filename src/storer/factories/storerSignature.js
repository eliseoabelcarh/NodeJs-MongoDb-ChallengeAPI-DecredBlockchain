

const storerSignatureFactory = (function () {

    let instance

    function create(dao, type) {


        return {
            save: async (id, data) => {
                return await dao.addSignatureById(id, data, type)
            }
        }

    }

    return {
        getInstance: function (dao, type) {
            if (!instance) {
                instance = create(dao, type)
            }
            return instance
        }
    }
}
)()

module.exports = storerSignatureFactory