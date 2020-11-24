
const storerPhotoIdFrontFactory = (function () {

    let instance

    function create(dao, type) {

        return {
            save: async (id, data) => {
                return await dao.addPhotoIdFrontById(id, data, type)
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

module.exports = storerPhotoIdFrontFactory