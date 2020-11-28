

const searcherVerifiedLastnameFactory = (function () {

    let instance

    function create(dao) {


        return {
            search: async (id) => {
                return await dao.getVerifiedLastnameById(id)
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

module.exports = searcherVerifiedLastnameFactory