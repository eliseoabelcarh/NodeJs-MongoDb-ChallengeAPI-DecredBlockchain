

const storerNewViewFactory = (function () {

    let instance

    function create(dao) {


        return {
            save: async (id, data) => {
                const { valid, view } = data
                return await dao.addView(id, valid, view)
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

module.exports = storerNewViewFactory