const { createServer } = require('./server/server')



async function main() {
    try {
        server = await createServer({})
    } catch (e) {
        console.log(e.message)
    }
}

process.on('SIGINT', async () => {
    try {
        if (server) {
            server.close()
            console.log('servidor cerrado con exito')
        }

    } catch (error) {
        console.err(error)
    } finally {
        process.exit(0)
    }
})

main()