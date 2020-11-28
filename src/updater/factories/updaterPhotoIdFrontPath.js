const fs = require('fs')


const updaterPhotoIdFrontPathFactory = (function () {

    let instance

    const uploadsPath = './src/uploads/'

    function create(dao) {



        return {
            update: async (id, data) => {
                //data ya llega en  binary
                if (!fs.existsSync(uploadsPath)) {
                    await fs.promises.mkdir(uploadsPath);
                }
                const fileName = id + '-photoIdFrontBinary.png'
                const path = uploadsPath + fileName
                await fs.promises.writeFile(path, data);
                return await dao.updatePhotoIdFrontPathById(id, path)
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

module.exports = updaterPhotoIdFrontPathFactory