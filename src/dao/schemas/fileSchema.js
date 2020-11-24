const mongoose = require('mongoose')


const Schema = mongoose.Schema

const fileSchemaColection = 'files'

const FileSchema = new Schema({
    id: Number,
    type: String,
    data: Buffer,//BLOB = new Buffer(0);
})

const fileSchemaModel = mongoose.model(fileSchemaColection, FileSchema)

module.exports = fileSchemaModel