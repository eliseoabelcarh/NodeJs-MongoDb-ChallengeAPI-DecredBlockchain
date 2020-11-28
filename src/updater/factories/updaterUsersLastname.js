
const updaterUsersLastnameFactory = (function () {

    let instance

    function create(dao) {


        return {
            update: async (id, data) => {
                return await dao.updateUsersLastnameById(id, data)
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

module.exports = updaterUsersLastnameFactory