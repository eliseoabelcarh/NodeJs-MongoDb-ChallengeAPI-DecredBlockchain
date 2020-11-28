const daoFactory = require("../../dao/factory/daoFactory")
const searcherSignatureFactory = require("./searcherSignature")
const searcherUsersLastnameFactory = require("./searcherUsersLastname")
const searcherUsersNameFactory = require("./searcherUsersName")
const searcherPhotoIdFrontPathFactory = require("./searcherPhotoIdFrontPath")
const searcherPhotoIdFrontPathThumbFactory = require("./searcherPhotoIdFrontPathThumb")
const searcherPhotoIdFrontBinaryFactory = require("./searcherPhotoIdFrontBinary")
const searcherPhotoIdFrontBinaryThumbFactory = require("./searcherPhotoIdFrontBinaryThumb")
const searcherVerifiedNameFactory = require("./searcherVerifiedName")
const searcherVerifiedLastnameFactory = require("./searcherVerifiedLastname")
const searcherViewFactory = require('./searcherView')



const dao = daoFactory.getDao()
const daoViews = daoFactory.getDaoViews()

const searcherFactory = {

    getInstance: function (type) {

        if (type === 'usersName') {
            return searcherUsersNameFactory.getInstance(dao)
        }
        if (type === 'usersLastname') {
            return searcherUsersLastnameFactory.getInstance(dao)
        }
        if (type === 'signature') {
            return searcherSignatureFactory.getInstance(dao)
        }
        if (type === 'verifiedName') {
            return searcherVerifiedNameFactory.getInstance(dao)
        }
        if (type === 'verifiedLastname') {
            return searcherVerifiedLastnameFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontPath') {
            return searcherPhotoIdFrontPathFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontPathThumb') {
            return searcherPhotoIdFrontPathThumbFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontBinary') {
            return searcherPhotoIdFrontBinaryFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontBinaryThumb') {
            return searcherPhotoIdFrontBinaryThumbFactory.getInstance(dao)
        }
        if (type === 'view') {
            return searcherViewFactory.getInstance(daoViews)
        }

    }
}


module.exports = searcherFactory


