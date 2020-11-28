const storerSignatureFactory = require("./storerSignature")
const storerUsersLastnameFactory = require("./storerUsersLastname")
const storerUsersNameFactory = require("./storerUsersName")
const storerPhotoIdFrontPathFactory = require("./storerPhotoIdFrontPath")
const storerPhotoIdFrontPathThumbFactory = require("./storerPhotoIdFrontPathThumb")
const storerPhotoIdFrontBinaryFactory = require("./storerPhotoIdFrontBinary")
const storerPhotoIdFrontBinaryThumbFactory = require("./storerPhotoIdFrontBinaryThumb")
const storerVerifiedNameFactory = require("./storerVerifiedName")
const storerVerifiedLastnameFactory = require("./storerVerifiedLastname")
const storerNewUserFactory = require('./storerNewUser')
const storerNewViewFactory = require('./storerNewView')

const daoFactory = require('../../dao/factory/daoFactory')
const dao = daoFactory.getDao()
const daoViews = daoFactory.getDaoViews()


const storerFactory = {

    getInstance: function (type) {

        if (type === 'newUser') {
            return storerNewUserFactory.getInstance(dao)
        }
        if (type === 'newView') {

            return storerNewViewFactory.getInstance(daoViews)
        }




        //no se usan - para dsps
        if (type === 'usersName') {
            return storerUsersNameFactory.getInstance(dao)
        }
        if (type === 'usersLastname') {
            return storerUsersLastnameFactory.getInstance(dao)
        }
        if (type === 'signature') {
            return storerSignatureFactory.getInstance(dao)
        }
        if (type === 'verifiedName') {
            return storerVerifiedNameFactory.getInstance(dao)
        }
        if (type === 'verifiedLastname') {
            return storerVerifiedLastnameFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontPath') {
            return storerPhotoIdFrontPathFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontPathThumb') {
            return storerPhotoIdFrontPathThumbFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontBinary') {
            return storerPhotoIdFrontBinaryFactory.getInstance(dao)
        }
        if (type === 'photoIdFrontBinaryThumb') {
            return storerPhotoIdFrontBinaryThumbFactory.getInstance(dao)
        }





    }
}


module.exports = storerFactory


