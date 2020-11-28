const mongoose = require('mongoose')


const Schema = mongoose.Schema

const fileSchemaColection = 'files'

const FileSchema = new Schema({
    id: Number,
    type: String,
    data: Buffer,
})

const fileSchemaModel = mongoose.model(fileSchemaColection, FileSchema)

module.exports = fileSchemaModel