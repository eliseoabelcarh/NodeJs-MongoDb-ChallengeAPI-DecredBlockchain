const { crearErrorRecursoNoEncontrado, crearErrorDeBaseDeDatos, crearErrorArgumentosInvalidos } = require('../../errors/apiError')
const { crearUserModel, crearUsersModelList } = require('../../models/modeloUser')
const mongoose = require('mongoose');
const userSchemaModel = require('../schemas/userSchema')


let daoUsersMongo = (function () {

    let instance

    function create(config) {

        return {
            addUser: async (datos) => {
                await conectar(config)
                const usuarioCreado = crearUserModel(datos)
                const userMongo = await userSchemaModel.findOne({ id: usuarioCreado.id }).exec();
                if (userMongo) {
                    throw crearErrorArgumentosInvalidos('id', 'usuario con id ya existe')
                }
                const user = new userSchemaModel(usuarioCreado)
                await user.save()
                await desconectar()
                return user.id
            },
            getUserById: async (id) => {
                await conectar(config)
                const idBuscado = Number.parseInt(id)
                const userMongo = await userSchemaModel.findOne({ id: idBuscado }).exec();
                if (!userMongo) {
                    throw crearErrorRecursoNoEncontrado('usuario', idBuscado)
                }
                const usuario = crearUserModel(userMongo)
                await desconectar()
                return usuario

            },
            getAll: async () => {
                await conectar(config)
                const datos = await userSchemaModel.find({});
                const usuarios = crearUsersModelList(datos)
                await desconectar()
                return usuarios
            },
            cleanAll: async () => {
                await conectar(config)
                await userSchemaModel.deleteMany({});
                await desconectar()
            },
            getSignatureById: async (id) => {
                await conectar(config)
                const usuario = await getUserById(id)
                await desconectar()
                return usuario.signature
            },
            getUsersNameById: async (id) => {
                await conectar(config)
                const usuario = await getUserById(id)
                await desconectar()
                return usuario.name
            },
            getUsersLastnameById: async (id) => {
                await conectar(config)
                const usuario = await getUserById(id)
                await desconectar()
                return usuario.lastname
            },
            getVerifiedNameById: async (id) => {
                await conectar(config)
                const usuario = await getUserById(id)
                await desconectar()
                return usuario.verifiedName
            },
            getVerifiedLastnameById: async (id) => {
                await conectar(config)
                const usuario = await getUserById(id)
                await desconectar()
                return usuario.verifiedLastname
            },
            getPhotoIdFrontPathById: async (id) => {
                await conectar(config)
                const usuario = await getUserById(id)
                await desconectar()
                return usuario.photoIdFrontPath
            },
            getPhotoIdFrontPathThumbById: async (id) => {
                await conectar(config)
                const usuario = await getUserById(id)
                await desconectar()
                return usuario.photoIdFrontPathThumb
            },
            getPhotoIdFrontBinaryById: async (id) => {
                await conectar(config)
                const usuario = await getUserById(id)
                await desconectar()
                return usuario.photoIdFrontBinary
            },
            getPhotoIdFrontBinaryThumbById: async (id) => {
                await conectar(config)
                const usuario = await getUserById(id)
                await desconectar()
                return usuario.photoIdFrontBinaryThumb
            },
            //
            updatePhotoIdFrontPathById: async (id, data) => {
                await conectar(config)
                const res = await userSchemaModel.updateOne({ id }, { $set: { photoIdFrontPath: data } })
                await desconectar()
                if (!res.ok) {
                    return false
                }
                return true
            },
            updatePhotoIdFrontPathThumbById: async (id, data) => {
                await conectar(config)
                const res = await userSchemaModel.updateOne({ id }, { $set: { photoIdFrontPathThumb: data } })
                await desconectar()
                if (!res.ok) {
                    return false
                }
                return true
            },
            updatePhotoIdFrontBinaryById: async (id, data) => {
                await conectar(config)
                const res = await userSchemaModel.updateOne({ id }, { $set: { photoIdFrontBinary: data } })
                await desconectar()
                if (!res.ok) {
                    return false
                }
                return true
            },
            updatePhotoIdFrontBinaryThumbById: async (id, data) => {
                await conectar(config)
                const res = await userSchemaModel.updateOne({ id }, { $set: { photoIdFrontBinaryThumb: data } })
                await desconectar()
                if (!res.ok) {
                    return false
                }
                return true
            },
            updateVerifiedNameById: async (id, data) => {
                await conectar(config)
                const res = await userSchemaModel.updateOne({ id }, { $set: { verifiedName: data } })
                await desconectar()
                if (!res.ok) {
                    return false
                }
                return true
            },
            updateVerifiedLastnameById: async (id, data) => {
                await conectar(config)
                const res = await userSchemaModel.updateOne({ id }, { $set: { verifiedLastname: data } })
                await desconectar()
                if (!res.ok) {
                    return false
                }
                return true
            }


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


async function getUserById(id) {
    const idBuscado = Number.parseInt(id)
    const userMongo = await userSchemaModel.findOne({ id: idBuscado }).exec();
    if (!userMongo) {
        throw crearErrorRecursoNoEncontrado('usuario', idBuscado)
    }
    return crearUserModel(userMongo)
}

module.exports = daoUsersMongo