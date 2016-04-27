var SyncRequest = require('sync-request');
var sURLServices = "http://127.0.0.1:9023/car/";

var oCarToOperateWith = null;

// TEST RUTA POST /car/create
var oCarToCreate = {
    name: "New Unit Test Car",
    color: "Unit Test Color",
    manufacturer: "Unit Test Manufacturer",
    model: "Unit Test Model",
    year: "Unit Test Year"
};

var oReqCarCreate = SyncRequest("POST", sURLServices + "create", {
    json: oCarToCreate
});
var oResponseCarCreate = JSON.parse(oReqCarCreate.body);

if(oResponseCarCreate !== undefined) {
    if(oResponseCarCreate.hasOwnProperty('error')) {
        if(oResponseCarCreate.error === true) {
            console.log('Error creando nuevo registro, mensaje de error: ' + oResponseCarCreate.error_message);            
        } else {
            console.log('OK, registro de LokiDB creado');            
        }
    }    
} else {
    console.log('Error creando nuevo registro');
}

// TEST RUTA POST /car/read
var oReqCarRead = SyncRequest("POST", sURLServices + "read");
var oResponseCarRead = JSON.parse(oReqCarRead.body);

if(oResponseCarRead !== undefined) {
    if(oResponseCarRead[0].hasOwnProperty('$loki')) {
        oCarToOperateWith = oResponseCarRead[0];
        console.log('OK, devolviendo objetos de LokiDB');
    }    
} else {
    console.log('Error en lectura');
}


// TEST RUTA POST /car/update
oCarToOperateWith.name = "NOMBRE_CAMBIADO_EN_TEST_UNITARIO";
var oReqCarUpdate = SyncRequest("POST", sURLServices + "update", {
    json: oCarToOperateWith    
});
var oResponseCarUpdate = JSON.parse(oReqCarUpdate.body);

if(oResponseCarUpdate !== undefined) {
    if(oResponseCarUpdate.hasOwnProperty('error')) {
        if(oResponseCarUpdate.error === true) {
            console.log('Error actualizando registro, mensaje de error: ' + oResponseCarUpdate.error_message);            
        } else {
            console.log('OK, registro de LokiDB actualizado');
        }     
    } else {
        console.log('Error en actualización');
    } 
} else {
    console.log('Error en actualización');
}


// TEST RUTA POST /car/delete
var oReqCarDelete = SyncRequest("POST", sURLServices + "delete", {
    json: oCarToOperateWith    
});
var oResponseCarDelete = JSON.parse(oReqCarDelete.body);

if(oResponseCarDelete !== undefined) {
    if(oResponseCarDelete.hasOwnProperty('error')) {
        if(oResponseCarDelete.error === true) {
            console.log('Error borrando registro, mensaje de error: ' + oResponseCarDelete.error_message);                        
        } else {
            console.log('OK, registro eliminado correctamente');
        }
    }    
} else {
    console.log('Error en borrado de registro');    
}