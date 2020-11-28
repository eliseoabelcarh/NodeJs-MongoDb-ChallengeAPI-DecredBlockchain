[![Build Status](https://github.com/decred/dcrdata/workflows/Build%20and%20Test/badge.svg)](https://github.com/decred/dcrdata/actions)
[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg)](http://copyfree.org)

## OVERVIEW

Proyecto propio desarrollado para Blockchain Learning Challenge - Decred / Talent Land Latinoamérica,
 utilizando datos nativos de la blockchain de Decred


## ABOUT THIS PROJECT

Este proyecto es una idea propia original que fue pensada para solucionar un caso de uso específico 
que viene obstaculizando el crecimiento del comercio de criptomonedas P2P.

PROBLEMA A SOLUCIONAR:
Mi nombre es Abel, tengo casi 3 años de experiencia en el comercio de criptomonedas P2P 
y miles de intercambios de bitcoin con usuarios de diferentes plataformas y países, uno de ellos es Localbitcoins.
Desde que empecé con las criptomonedas hasta el día de hoy, Localbitcoins y otras plataformas han mejorado 
en sus sistemas de verificación de identidad, sin embargo diariamente sigue existiendo desconfianza entre 
los usuarios que operan en estas plataformas, por lo cual, es muy común que algún vendedor te solicite la 
foto de tu dni u otra identificación. Es bastante claro que quien entrega la foto de su Dni corre un alto riesgo 
en la seguridad de su privacidad, posible filtración de datos, robo de identidad, etc. 
Por otra parte existe un problema para el vendedor que necesita pedir la foto a la otra persona, ya que implica una posible cancelación 
de la venta en caso el comprador no quiera enviar la foto, asimismo, si no la solicita también corre diferentes riesgos como
participar sin conocimiento en un sistema de lavado de dinero, narcotráfico, triangulaciones, hackeo de cuentas bancarias y más. Tengo una
muy mala experiencia con éste último, que despúes de 3 años aún no termina de solucionarse.
Pero no termina ahí... gracias a esa experiencia, nació este proyecto!!


SOLUCIÓN:
El proyecto total consta de 2 partes, para :
BACKEND - Release 1 - Este repositorio pertenece a este release y proyecto.
FRONTEND - Futuros releases - Ya comenzó el desarrollo, pero no es parte de este proyecto para el challenge.(Demo de funcionamiento en Video)

Tenemos 3 roles: 
- Nosotros, como proveedores del servicio.
- Nuestro Usuario que necesita entregar la foto del DNI para identificarse, de ahora en adelante lo llamaremos "USUARIO".
- El vendedor de criptomonedas o empresa que necesita conocer los nombres reales de nuestro "USUARIO".

PASO 1: 
"USUARIO" se registra con nosotros, y crea un PIN.
Este PIN o Firma Digital que será usado para garantizar el permiso por cada acción posterior que el "USUARIO" 
quiera realizar. Este PIN podrá ser reemplazado en futuros releases por una llave privada
y el uso de una wallet de criptomonedas.

PASO 2:
"USUARIO" carga la foto del DNI en nuestros servidores firmando el envío con su PIN creado.
Por nuestra parte, nosotros creamos un registro único e inmutable de esa foto en la blockchain de DECRED
utilizando las APIs de timestamp de DECRED, garantizando que no habrá alteración de esa foto.

PASO 3: 
"USUARIO" solicita cuáles datos desea que nosotros verifiquemos. Por ejemplo elegiremos que sea el Nombre.
Nosotros recibimos la solicitud, la validamos y un algoritmo especial lee el nombre de la foto del DNI, y lo compara
con el nombre registrado. En caso coincidan, toma el Nombre y lo registra como inalterable en la blockchain de DECRED.

PASO 4:
"USUARIO" elige qué datos de los verificados desea compartir, por ejemplo, asumamos que elige su NOMBRE y su APELLIDO.
El "USUARIO" firma la solicitud por cada dato, y por cada dato solicitado nosotros realizamos la verificación de su existencia en 
la blockchain de DECRED. Esto garantiza que los datos no han sido cambiados y que la solicitud la realizó el mismo "USUARIO".
Este proceso genera un ID VIEW. 

Características del ID VIEW: 
Es un id único e irrepetible de una sola vida, que será utilizado en una URL como llamada a nuestras APIs para obtener los datos que
"USUARIO" está compartiendo. Después de la primera llamada, el ID VIEW queda inválido y no devuelve datos.
Ejemplo de llamada GET con params: `http://dominio.com/identities?idView=ID-UNICO-E-IRREPETIBLE-DE-UNA-SOLA-VIDA`

PASO 5: 
El individuo o empresa que necesita verificar los nombres de nuestro "USUARIO", podrá visualizar los datos una sola vez, y
la autenticidad de los datos y el permiso del "USUARIO" serán garatizados por la inmutabilidad de la blockchain de DECRED. 







## APIs

Estas APIs son de tipo REST API, accesibles via protocolo HTTP, 
IMPORTANTE: para todas las llamadas utilizar prefijo  `/api` 


#### Endpoints

| Tipo |   Ruta              | Descripción                | Datos                                              |
| ---- |-------------------- | -------------------------- | -------------------------------------------------- |
| POST | `/users`            | Alta de usuarios           | Ejm.Body: {name,lastname,email,password,signature} |
| POST | `/photos/:id`       | Cargar Foto DNI            | Ejm.Body: {dataType,data(base64Encoded),signature} |
| POST | `/verifications/:id`| Verificación de Dato       | Ejm.Body: {dataType,signature}                     |
| POST | `/shares/:id`       | Datos a compartir          | Ejm.Body: {signature,types}                        |
| GET  | `/identities`       | Vista de datos compartidos | Ejm.Query: ?viewId=UNICO-ID                        |
| GET  | `/`                 | Test only                  | response 'okay'                                    | 

Tipos de Dato:
name: String - Nombre/s tal como aparece en foto DNI
lastname: String - Apellido/s tal como aparece en foto DNI
signature: String - PIN o firma digital
email: String - opcional not null
password: String - opcional not null
dataType: String - para Foto DNI Frontal usar valor 'photoIdFrontBinary'
data: Binary Base64 encoded - Ver función recomendada nro1 
types: Array of dataTypes - Ejm: types:['usersName', 'usersLastname']

``
FUNCION NRO 1
const getBinary = async (pathImage) => {
    const data = await fs.readFile(pathImage, "binary");
    return new Buffer.from(data, 'binary')
}``
