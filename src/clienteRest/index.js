const axios = require('axios').default

//llamada a las APIs y rutas de proyecto
function crearClienteRest(port) {
    return {
        registrar: async (user) => {
            return await sendRequest({ url: crearURLBase(port) + `/users`, method: 'post', data: user })
        },
        cargarPhotoId: async (id, data) => {
            return await sendRequest({ url: crearURLBase(port) + `/photos/${id}`, method: 'post', data })
        },
        solicitarVerificacion: async (id, data) => {
            return await sendRequest({ url: crearURLBase(port) + `/verifications/${id}`, method: 'post', data })
        },
        compartirDatos: async (id, data) => {
            return await sendRequest({ url: crearURLBase(port) + `/shares/${id}`, method: 'post', data })
        },
        verDatosCompartidos: async (idView) => {
            return await sendRequest({ url: crearURLBase(port) + `/identities`, method: 'get', params: { idView } })
        },

        testApiRoute: async () => {
            return await sendRequest({ url: crearURLBase(port) + ``, method: 'get' })
        }
    }
}

//urlBase de API con prefijo /api
function crearURLBase(port) {
    return `http://localhost:${port}/api`
}

// envío de request
// dependencia con axios
async function sendRequest(req) {
    try {
        const result = await axios(req)
        return result
    } catch (error) {
        if (error.response) {
            const NE = new Error(`error ${error.response.status} enviado desde el servidor: ${error.response.data.message}`)
            NE.status = error.response.status
            NE.message = error.response.data.message
            throw NE
        } else {
            throw new Error('error al enviar la peticion')
        }
    }
}

module.exports = { crearClienteRest }