const { crearErrorRecursoNoEncontrado, crearErrorDeBaseDeDatos, crearErrorArgumentosInvalidos } = require('../../errors/apiError')
const { crearUserModel, crearUsersModelList } = require('../../models/modeloUser')
const mongoose = require('mongoose');
const fileSchemaModel = require('../schemas/fileSchema')


let daoFilesMongo = (function () {

    let instance

    async function create(config) {

        return {
            addPhotoIdFrontById: async (id, data, type) => {
                await conectar(config)
                /*  const usuarioCreado = crearUserModel(datos)
                 const userMongo = await userSchemaModel.findOne({ id: usuarioCreado.id }).exec();
                 if (userMongo) {
                     throw crearErrorArgumentosInvalidos('id', 'usuario con id ya existe')
                 }
                 const user = new userSchemaModel(usuarioCreado)
                 await user.save() */
                await desconectar()
                return user.id
            },
            getUserById: async (id) => {
                await conectar(config)
                /*  const idBuscado = Number.parseInt(id)
                 const userMongo = await userSchemaModel.findOne({ id: idBuscado }).exec();
                 if (!userMongo) {
                     throw crearErrorRecursoNoEncontrado('usuario', idBuscado)
                 }
                 const usuario = crearUserModel(userMongo) */
                await desconectar()
                return usuario

            },
            getAll: async () => {
                await conectar(config)
                /*    const datos = await userSchemaModel.find({});
                   const usuarios = crearUsersModelList(datos) */
                await desconectar()
                return usuarios
            },
            cleanAll: async () => {
                await conectar(config)
                /*    await userSchemaModel.deleteMany({}); */
                await desconectar()
            }
        }
    }

    return {
        getInstance: async function (config) {
            if (!instance) {
                instance = await create(config)
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
        console.log('...conectado a BDFiles!')
    } catch (error) {
        throw crearErrorDeBaseDeDatos(error.message)
    }
}
async function desconectar() {
    console.log('...desconectando BDFiles')
    await mongoose.connection.close()
}

module.exports = daoFilesMongo