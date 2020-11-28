
const searcherPhotoIdFrontPathThumbFactory = (function () {

    let instance

    function create(dao) {

        return {
            search: async (id) => {
                return await dao.getPhotoIdFrontPathThumbById(id)
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

module.exports = searcherPhotoIdFrontPathThumbFactory