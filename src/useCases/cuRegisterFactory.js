const { getUserModelFromRequest } = require('../models/modeloRequestServer')


const cuRegisterFactory = (function () {

    let instance

    function create(storer) {

        return {
            // se utiliza para dar de alta un usuario nuevo
            register: async (req) => {
                const userModel = getUserModelFromRequest(req)
                return await storer.storeData({ id: null, type: 'newUser', data: userModel })
            }
        }
    }

    return {
        getInstance: function (storer) {
            if (!instance) {
                instance = create(storer)
            }
            return instance
        }
    }
}
)()

module.exports = cuRegisterFactory