/**
 * Librería Express para responder a peticiones HTTP
 */
var express = require('express');

/**
 * Librería de utilidades implementada para este tutorial
 */
var RequestTools = require('./tools.js');

/**
 * Librería de base de datos en memoria LokiDB
 */
var LokiDatabaseLibrary = require('lokijs');

/**
 * Librería de parser del cuerpo de las peticiones HTTP
 */
var bodyParser = require('body-parser');

/**
 * Instanciamos un objeto de Express
 */
var oApp = express();

/**
 * Instanciamos un objeto de la librería de utilidades
 */
var oTool = new RequestTools();

/**
 * Implementamos el parseo de JSON, datos de formulario, y texto plano
 */
oApp.use(bodyParser.json());
oApp.use(bodyParser.urlencoded({ extended: true }));
oApp.use(bodyParser.text());

/**
 * Creamos una nueva base de datos LokiDB en el fichero cars.json.
 * Creamos la colección 'cars', que contendrá los registros de los coches 
 */
var oLokiDB = new LokiDatabaseLibrary('cars.json');
var oCarCollection = null;
oCarCollection = oLokiDB.addCollection('cars');

/**
 * Ruta POST /create. Se usa para crear un registro de la entidad.
 * Requiere de los parámetros siguientes:
 * name, color, manufacturer, model, year
 */
oApp.post('/car/create', function(oRequest, oResponse) {
    var oBody = oRequest.body;
    var bFieldsOK = oTool.requiredFieldsExist(oBody, ['name', 'color', 'manufacturer', 'model', 'year']);
    if (bFieldsOK === true) {
        oCarCollection.insert(oBody);
        oLokiDB.saveDatabase();
        oTool.writeJSONResponse(oResponse, {
            error: false
        });
    } else {
        oTool.writeJSONResponse(oResponse, {
            error: true,
            error_message: 'No has pasado los parámetros requeridos'
        });
    }
});

/**
 * Ruta POST /read. Se usa para leer un registro.
 * Admite un parámetro: index, que indica el registro,
 * empezando por el numero 1, a leer. Si no se pasa este
 * parámetro se devuelve toda la colección
 */
oApp.post('/car/read', function(oRequest, oResponse) {
    var oBody = oRequest.body;
    var oCarsData = oCarCollection.data;
    if (!oBody.hasOwnProperty('index')) {
        oTool.writeJSONResponse(oResponse, oCarsData);
    } else {
        var iCar = parseInt(oBody.index);
        var oCar = oCarCollection.get(iCar);
        oTool.writeJSONResponse(oResponse, oCar);
    }
});

/**
 * Ruta POST /update. Se usa para actualizar un registro.
 * Requiere que en el cuerpo se pase el objeto devuelto en la 
 * lectura, con los campos cambiados a los nuevos datos que
 * se quieren actualizar.
 */
oApp.post('/car/update', function(oRequest, oResponse) {
    var oBody = oRequest.body;
    if(!oBody.hasOwnProperty('$loki')) {
        oTool.writeJSONResponse(oResponse, {
            error: true,
            error_message: 'Debes suministrarme el mismo objeto que te devuelve la base de datos, con las modiificaciones pertinentes'            
        });
    } else {        
        oCarCollection.update(oBody);
        oLokiDB.saveDatabase();
        oTool.writeJSONResponse(oResponse, {
            error: false
        });      
    }
});

/**
 * Ruta POST /delete. Se usa para eliminar un registro.
 * Requiere que en el cuerpo le pasemos el objeto que
 * se devuelve en la lectura.
 */
oApp.post('/car/delete', function(oRequest, oResponse) {
    var oBody = oRequest.body;
    if(!oBody.hasOwnProperty('$loki')) {
        oTool.writeJSONResponse(oResponse, {
            error: true,
            error_message: 'Debes suministrarme el mismo objeto que te devuelve la base de datos para poder eliminarlo'   
        });
    } else {
        oCarCollection.remove(oBody);
        oLokiDB.saveDatabase();
        oTool.writeJSONResponse(oResponse, {
            error: false            
        });      
    }
});

/**
 * Ponemos la aplicación a escuchar en el puerto 9023
 */
oApp.listen(9023, function() {
    console.log('App test sync-request en puerto 9023');
});