

const storerVerifiedLastnameFactory = (function () {

    let instance

    function create(dao) {


        return {
            save: async (id, data) => {
                return await dao.addVerifiedLastnameById(id, data)
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

module.exports = storerVerifiedLastnameFactory