require('dotenv').config()

const baseURL = 'https://time.decred.org'
const network = process.env.TIMESTAMP_NETWORK || 'testnet'
const versionApiTimestamp = process.env.TIMESTAMP_VERSION_API || 'v1'


const timestampConfig = {
    getNetworkPort: () => {
        if (network === 'mainnet') {
            return '49152'
        }
        return '59152'
    },
    getVersionAPI: () => {
        return versionApiTimestamp
    },
    getBaseURL: () => {
        return baseURL
    }
}


module.exports = timestampConfig