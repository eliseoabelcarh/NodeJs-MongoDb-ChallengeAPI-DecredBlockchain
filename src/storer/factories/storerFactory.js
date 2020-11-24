const storerPhotoIdFrontFactory = require("./storerPhotoIdFront")
const storerSignatureFactory = require("./storerSignature")
const storerUsersLastnameFactory = require("./storerUsersLastname")
const storerUsersNameFactory = require("./storerUsersName")
const daoFactory = require('../../dao/factory/daoFactory')

const dao = daoFactory.getDao()
const daoFiles = daoFactory.getDaoFiles()


const storerFactory = {

    getInstance: function (type) {

        if (type === 'photoIdFront') {
            return storerPhotoIdFrontFactory.getInstance(daoFiles, type)
        }
        if (type === 'usersLastname') {
            return storerUsersLastnameFactory.getInstance(dao, type)
        }
        if (type === 'usersName') {
            return storerUsersNameFactory.getInstance(dao, type)
        }
        if (type === 'signature') {
            return storerSignatureFactory.getInstance(dao, type)
        }

    }
}


module.exports = storerFactory


