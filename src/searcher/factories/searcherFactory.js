const daoFactory = require("../../dao/factory/daoFactory")
const searcherPhotoIdFrontFactory = require("./searcherPhotoIdFront")
const searcherSignatureFactory = require("./searcherSignature")
const searcherUsersLastnameFactory = require("./searcherUsersLastname")
const searcherUsersNameFactory = require("./searcherUsersName")
const daoFactory = require('../../dao/factory/daoFactory')

const dao = daoFactory.getDao()

const searcherFactory = {

    getInstance: function (type) {

        if (type === 'photoIdFront') {
            return searcherPhotoIdFrontFactory.getInstance(dao)
        }
        if (type === 'usersLastname') {
            return searcherUsersLastnameFactory.getInstance(dao)
        }
        if (type === 'usersName') {
            return searcherUsersNameFactory.getInstance(dao)
        }
        if (type === 'signature') {
            return searcherSignatureFactory.getInstance(dao)
        }

    }
}


module.exports = searcherFactory


