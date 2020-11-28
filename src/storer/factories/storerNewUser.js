

const storerNewUserFactory = (function () {

    let instance

    function create(dao) {


        return {
            save: async (id, data) => {
                //id llega null
                return await dao.addUser(data)
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

module.exports = storerNewUserFactory