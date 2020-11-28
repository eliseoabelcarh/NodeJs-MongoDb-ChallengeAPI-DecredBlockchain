const { crearErrorRecursoNoEncontrado, crearErrorDeBaseDeDatos, crearErrorArgumentosInvalidos } = require('../../errors/apiError')
const { crearViewModel } = require('../../models/modeloView')
const mongoose = require('mongoose');
const viewSchemaModel = require('../schemas/viewSchema')


let daoUsersMongo = (function () {

    let instance

    function create(config) {

        return {
            addView: async (id, valid, view) => {
                await conectar(config)
                const viewCreado = crearViewModel({ id, valid, view })
                const viewMongo = await viewSchemaModel.findOne({ id: viewCreado.id }).exec();
                if (viewMongo) {
                    throw crearErrorArgumentosInvalidos('id', 'view con id ya existe')
                }
                const vista = new viewSchemaModel(viewCreado)
                await vista.save()
                await desconectar()
                return vista.id
            },
            getViewById: async (idX) => {
                await conectar(config)
                const viewMongo = await viewSchemaModel.findOne({ id: idX }).exec();
                if (!viewMongo) {
                    throw crearErrorRecursoNoEncontrado('view', idBuscado)
                }
                const { id, valid, view } = crearViewModel(viewMongo)
                await desconectar()
                return { id, valid, view }

            },
            getAll: async () => {
                await conectar(config)
                const datos = await viewSchemaModel.find({});
                const views = crearViewsModelList(datos)
                await desconectar()
                return views
            },
            cleanAll: async () => {
                await conectar(config)
                await viewSchemaModel.deleteMany({});
                await desconectar()
            },

            //
            updateViewById: async (id, data) => {
                await conectar(config)
                const res = await viewSchemaModel.updateOne({ id }, { $set: { valid: data } })
                await desconectar()
                if (!res.ok) {
                    return false
                }
                return true
            },



        }
    }

    return {
        getInstance: function (config) {
            if (!instance) {
                instance = create(config)
            }
            return instance
        }
    }

})()


async function conectar(config) {
    try {
        await mongoose.connect(config.cnxString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('...conectado a BD!')
    } catch (error) {
        throw crearErrorDeBaseDeDatos(error.message)
    }
}
async function desconectar() {
    console.log('...desconectando BD')
    await mongoose.connection.close()
}


async function getViewById(id) {
    const idBuscado = Number.parseInt(id)
    const userMongo = await userSchemaModel.findOne({ id: idBuscado }).exec();
    if (!userMongo) {
        throw crearErrorRecursoNoEncontrado('view', idBuscado)
    }
    return crearViewModel(userMongo)
}

module.exports = daoUsersMongo