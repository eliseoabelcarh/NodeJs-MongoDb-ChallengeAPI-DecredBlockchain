
const { createWorker } = require('tesseract.js')
const { crearErrorArgumentosInvalidos, crearErrorEnModulo } = require('../errors/apiError')
const fs = require('fs')



const crearImageTextReader = () => {
    const logger = {
        logger: m => {
            let num = m.progress
            num = Number.parseFloat(num * 100).toFixed(2)
            console.log(num + '%')
        },
    }

    return {
        readTextFromImage: async (pathImage) => {
            try {
                const worker = createWorker(logger)
                if (!fs.existsSync(pathImage)) {
                    throw crearErrorArgumentosInvalidos('pathImage', 'campo vacío')
                }
                await worker.load();
                await worker.loadLanguage('eng');
                await worker.initialize('eng');
                const { data: { text } } = await worker.recognize(pathImage);
                await worker.terminate();
                return text
            } catch (error) {
                throw handleError(error)
            }

        }
    }

}

function handleError(error) {
    if (error.type !== 'INVALID_ARGS') {
        return crearErrorEnModulo('imageReader')
    }
    return error
}

module.exports = {
    crearImageTextReader
}