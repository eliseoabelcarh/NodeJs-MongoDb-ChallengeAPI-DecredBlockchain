
const storerPhotoIdFrontBinaryFactory = (function () {

    let instance

    function create(dao) {

        return {
            save: async (id, data) => {
                return await dao.addPhotoIdFrontBinaryById(id, data)
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

module.exports = storerPhotoIdFrontBinaryFactory