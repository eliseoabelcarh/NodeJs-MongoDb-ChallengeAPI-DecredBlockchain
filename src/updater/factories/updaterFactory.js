const updaterSignatureFactory = require("./updaterSignature")
const updaterUsersLastnameFactory = require("./updaterUsersLastname")
const updaterUsersNameFactory = require("./updaterUsersName")
const updaterPhotoIdFrontPathFactory = require("./updaterPhotoIdFrontPath")
const updaterPhotoIdFrontPathThumbFactory = require("./updaterPhotoIdFrontPathThumb")
const updaterPhotoIdFrontBinaryFactory = require("./updaterPhotoIdFrontBinary")
const updaterPhotoIdFrontBinaryThumbFactory = require("./updaterPhotoIdFrontBinaryThumb")
const updaterVerifiedNameFactory = require("./updaterVerifiedName")
const updaterVerifiedLastnameFactory = require("./updaterVerifiedLastname")
const updaterViewFactory = require('./updaterView')

const daoFactory = require('../../dao/factory/daoFactory')
const dao = daoFactory.getDao()
const daoViews = daoFactory.getDaoViews()


const updaterFactory = {

    //de acuerdo al tipo de dato, devuelve
    // el updater correspondiente que irá a actualizar
    //a la base de datos el dato respectivo
    getInstance: function (type) {

        if (type === 'newUser') {
            return updaterNewUserFactory.getInstance(dao)
        }
        if (type === 'usersName') {
            return updaterUsersNameFactory.getInstance(dao)
        }
        if (type === 'usersLastname') {
            return updaterUsersLastnameFactory.getInstance(dao)
        }
        if (type === 'signature') {
            return updaterSignatureFactory.getInstance(dao)
        }
        if (type === 'verifiedName') {
            return updaterVerifiedNameFactory.getInstance(dao)
        }
        if (type === 'verifiedLastname') {
            return updaterVerifiedLastnameFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontPath') {
            return updaterPhotoIdFrontPathFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontPathThumb') {
            return updaterPhotoIdFrontPathThumbFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontBinary') {
            return updaterPhotoIdFrontBinaryFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontBinaryThumb') {
            return updaterPhotoIdFrontBinaryThumbFactory.getInstance(dao)
        }
        if (type === 'view') {
            return updaterViewFactory.getInstance(daoViews)
        }

    }
}


module.exports = updaterFactory


