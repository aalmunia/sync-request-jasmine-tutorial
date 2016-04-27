/**
 * Clase de utilidades para el tutorial
 */
function ToolsSyncRequest() {
    if(!this instanceof ToolsSyncRequest) {
        return new ToolsSyncRequest();
    }
}

/**
 * Método que revisa la existencia de los campos pedidos.
 * @param {Object} oRequestBody El cuerpo de la petición HTTP, que es la estructura de JSON con los datos correspondientes
 * @param {Array} aRequired Un array de nombres de campo requeridos.
 */
ToolsSyncRequest.prototype.requiredFieldsExist = function(oRequestBody, aRequired) {
    var bExist = true;
    var aFieldsBody = Object.keys(oRequestBody);
    var iFieldsRequired = aRequired.length;
     
    for(var i = 0; i < iFieldsRequired; i++) {
        if(!oRequestBody.hasOwnProperty(aRequired[i])) {
            return false;
        }                                
    }    
    return bExist;
}

/**
 * Método que devuelve una estructura de datos JSON, usando el objeto de Response de Express
 * @param {Object} oResponse El objeto de Response de Express
 * @param {Object} oToWrite El objeto que se quiere devolver como JSON
 */
ToolsSyncRequest.prototype.writeJSONResponse = function(oResponse, oToWrite) {
    oResponse.setHeader('Content-Type', 'application/json');
    oResponse.write(JSON.stringify(oToWrite));
    oResponse.end();
}

/**
 * Exportamos la clase para su uso como módulo de node.js
 */
module.exports = ToolsSyncRequest;