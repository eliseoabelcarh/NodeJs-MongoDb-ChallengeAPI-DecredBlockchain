const mongoose = require('mongoose')


const Schema = mongoose.Schema

const userSchemaColection = 'users'

const UserSchema = new Schema({
    id: Number,
    name: String,
    lastname: String,
    email: String,
    photoIdFront: String,
})

const userSchemaModel = mongoose.model(userSchemaColection, UserSchema)

module.exports = userSchemaModel