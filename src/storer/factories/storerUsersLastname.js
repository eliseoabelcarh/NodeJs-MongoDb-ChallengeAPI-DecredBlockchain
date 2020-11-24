
const storerUsersLastnameFactory = (function () {

    let instance

    function create(dao, type) {


        return {
            save: async (id, data) => {
                return await dao.addUsersLastnameById(id, data, type)
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

module.exports = storerUsersLastnameFactory