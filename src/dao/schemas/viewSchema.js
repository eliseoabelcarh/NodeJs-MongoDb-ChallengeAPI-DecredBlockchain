const mongoose = require('mongoose')


const Schema = mongoose.Schema

const viewSchemaColection = 'views'

const ViewSchema = new Schema({
    id: String,
    valid: Boolean,
    view: Schema.Types.Mixed,


})

const viewSchemaModel = mongoose.model(viewSchemaColection, ViewSchema)

module.exports = viewSchemaModel