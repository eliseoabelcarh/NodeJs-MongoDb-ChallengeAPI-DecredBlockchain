


/* const forHash = {
0: userId,
1: signature,
2: data
} */

const crearModeloHashCombined = (forHash, hasher) => {


    const userId = forHash[0]
    const signature = forHash[1]
    const data = forHash[2]
    const hash1 = hasher.hash({ data: JSON.stringify(userId) })
    const hash2 = hasher.hash({ data: JSON.stringify(signature) })
    const hash3 = hasher.hash({ data })
    const hashesCombined = combineHashes([hash1, hash2, hash3])
    return { id: forHash[0], combined: hasher.hash({ data: hashesCombined }) }


}

module.exports = { crearModeloHashCombined }


function combineHashes(array) {
    let res = ''
    for (const hash of array) {
        res += hash
    }
    return res
}