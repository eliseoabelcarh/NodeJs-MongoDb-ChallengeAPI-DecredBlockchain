
const updaterPhotoIdFrontBinaryFactory = (function () {

    let instance

    function create(dao) {

        return {
            update: async (id, data) => {
                return await dao.updatePhotoIdFrontBinaryById(id, data)
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

module.exports = updaterPhotoIdFrontBinaryFactory