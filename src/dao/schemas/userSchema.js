const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchemaColection = 'users'

// schema modelo para base de datos de usuarios
const UserSchema = new Schema({
    id: Number,
    name: String,
    lastname: String,
    email: String,
    password: String,
    signature: String,
    verifiedName: Boolean,
    verifiedLastname: Boolean,
    photoIdFrontPath: String,
    photoIdFrontPathThumb: String,
    photoIdFrontBinary: Buffer,
    photoIdFrontBinaryThumb: Buffer,

})

const userSchemaModel = mongoose.model(userSchemaColection, UserSchema)

module.exports = userSchemaModel