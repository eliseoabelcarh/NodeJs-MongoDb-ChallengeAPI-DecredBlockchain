const updaterFactory = require("./factories/updaterFactory")


const crearUpdater = () => {

    return {

        updateData: async ({ id, type, data }) => {

            let updater = updaterFactory.getInstance(type)
            return await updater.update(id, data)

        }
    }
}


module.exports = { crearUpdater }