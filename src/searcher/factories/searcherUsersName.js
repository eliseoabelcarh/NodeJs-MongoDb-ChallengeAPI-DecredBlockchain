

const searcherUsersNameFactory = (function () {

    let instance

    function create(dao) {


        return {
            search: async (id) => {
                return await dao.getUsersNameById(id)
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

module.exports = searcherUsersNameFactory