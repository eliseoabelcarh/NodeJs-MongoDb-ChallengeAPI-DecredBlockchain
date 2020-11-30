const mongoose = require('mongoose')


const Schema = mongoose.Schema

const fileSchemaColection = 'files'


// no se usa este schema por el momento
const FileSchema = new Schema({
    id: Number,
    type: String,
    data: Buffer,
})

const fileSchemaModel = mongoose.model(fileSchemaColection, FileSchema)

module.exports = fileSchemaModel