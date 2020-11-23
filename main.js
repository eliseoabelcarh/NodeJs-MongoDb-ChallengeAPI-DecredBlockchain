const dcrtime = require("dcrtimejs")
const axios = require('axios')

dcrtime.setNetwork();
/* setNetwork(network) {
    apiBase = network === "testnet" ? "https://time-testnet.decred.org:59152" : "https://time.decred.org:49152";
}, */
async function main() {

    //const name1 = 'nanana1'
    //const name2 = 'nanana2'

    //dcrtime.timestampFromBase64(["dGVzdA=="], "dcrtimejs").then(some => { console.log('data1:: ', some) })


    //dcrtime.timestamp(["3e5f123547e24ba01d84a814a5efb9b451928687316a3ecbce55e0f9eee4d0d5"], "holamano2").then(some => { console.log('data2  ', some) })

    const ooo = await dcrtime.verify(["3e5f123547e24ba01d84a814a5efb9b451928687316a3ecbce55e0f9eee4d0d5"], "holamano2")
    console.log(ooo.digests[0].chaininformation.merklepath.Hashes)


    //dcrtime.verifyFromBase64(["dGVzdA=="], "dcrtimejs").then(some => { console.log('data 4  ', some) })


}

async function call() {
    //const url = 'https://timestamp.decred.org/results?digests=11779c9e577ee238a61dc49227bc8cd8cbd7f8db60efb7d2d3336706d32b5372,fc11cc406688eb75d83ee3db77f4d1776b81de16ddba10738a7d3703299b7646&names=file1.json,file2.txt&timestamp=true'



    /* const url = 'https://time.decred.org:49152/v1/timestamp/'
     const data = {
         "id": "dcrtime cli",
         "digests": [
             "d412ba345bc44fb6fbbaf2db9419b648752ecfcda6fd1aec213b45a5584d1b13"
         ]
     }
     const res = await axios.post(url, data)
     console.log('resssss ', res)
 */



    const url = 'https://time.decred.org:49152/v1/verify/'
    const data = {
        "id": "dcrtime cli",
        "digests": [
            "d412ba345bc44fb6fbbaf2db9419b648752ecfcda6fd1aec213b45a5584d1b13"
        ],
        "timestamps": null
    }
    const res = await axios.post(url, data)
    console.log('resssss222 ', res.data.digests[0].result)

}


const timestampConfig = require('./src/configs/timestampConfig')

const network = timestampConfig.getNetworkPort()
const versionAPI = timestampConfig.getVersionAPI()




async function timestampOne({ id, digest }) {
    const url = `https://time.decred.org:${network}/${versionAPI}/timestamp/`
    const data = { id, "digests": [digest] }
    const res = await axios.post(url, data)
    console.log('Resultado de Timestamp: ', res)
    return res
}

async function verifyOne({ id, digest }) {
    const url = `https://time.decred.org:${network}/${versionAPI}/verify/`
    const data = { id, "digests": [digest], "timestamps": null }
    const res = await axios.post(url, data)
    console.log('Resultado Verificación: ', res)
    return res

}



const digestTimestampTest = { "id": 'hamonspapahual', "digest": '167185e999b12842aa7f1bc512797c3d922a0e4e7feedd022e8cb98bc730a60b' }

//timestampOne(digestTimestampTest)

const digestVerifyTest = { "id": 'hamonspapahual', "digest": '167185e999b12842aa7f1bc512797c3d922a0e4e7feedd022e8cb98bc730a60b' }

verifyOne(digestVerifyTest)


 //Possible Results
    // 0 Success.
    // 1	the file was already in the server.Timestamp failed.
    // 2	the file was NOT found in the server, which means it is not anchored.
