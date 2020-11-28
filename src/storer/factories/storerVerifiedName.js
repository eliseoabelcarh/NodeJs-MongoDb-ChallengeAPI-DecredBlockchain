

const storerVerifiedNameFactory = (function () {

    let instance

    function create(dao) {


        return {
            save: async (id, data) => {
                return await dao.addVerifiedNameById(id, data)
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

module.exports = storerVerifiedNameFactory