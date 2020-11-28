function stringCut(str) {
    var nstr = str.split(/\n/);
    return nstr.slice(0, 10);
}
function fix1(data) {
    return data.split(' ').filter(strin => {
        return strin.trim().length > 1
    })
}
function fix2(array) {
    let arrayAntesDeUnir = array.filter(palabra => {
        palabra = palabra.trim()
        if (palabra.length > 1) {
            return palabra
        }
    })
    let dato = ''
    arrayAntesDeUnir.forEach(element => {
        dato += (element + ' ')
    });
    dato = dato.trim()
    return dato
}

function getNamesFromText(text) {
    const data = stringCut(text)
    let nombres = data[6]
    let array2 = fix1(nombres)
    nombres = fix2(array2)
    //TODO remplazar Ñ por N
    nombres = nombres.toUpperCase().trim()
    return nombres
}

function getLastnamesFromText(text) {
    const data = stringCut(text)
    let apellidos = data[4]
    let array1 = fix1(apellidos)
    apellidos = fix2(array1)
    //TODO remplazar Ñ por N
    apellidos = apellidos.toUpperCase().trim()
    return apellidos
}


module.exports = {
    getNamesFromText,
    getLastnamesFromText,
}
