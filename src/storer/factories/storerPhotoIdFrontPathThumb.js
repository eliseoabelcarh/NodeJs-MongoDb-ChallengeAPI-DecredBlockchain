
const storerPhotoIdFrontPathThumbFactory = (function () {

    let instance

    function create(dao) {

        return {
            save: async (id, data) => {
                return await dao.addPhotoIdFrontPathThumbById(id, data)
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

module.exports = storerPhotoIdFrontPathThumbFactory