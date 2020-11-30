const mongoose = require('mongoose')


const Schema = mongoose.Schema

const viewSchemaColection = 'views'

// modelo schema para vistas
// campo view contiene un objeto json con
// los datos verrificados que usuario está compartiendo
const ViewSchema = new Schema({
    id: String,
    valid: Boolean,
    view: Schema.Types.Mixed,


})

const viewSchemaModel = mongoose.model(viewSchemaColection, ViewSchema)

module.exports = viewSchemaModel