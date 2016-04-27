var SyncRequest = require('sync-request');
var oCarToOperateWith = null;
var sBaseURLServices = 'http://127.0.0.1:9023/car/';
var oURLServices = {
    CREATE: sBaseURLServices + 'create',
    READ: sBaseURLServices + 'read',
    UPDATE: sBaseURLServices + 'update',
    DELETE: sBaseURLServices + 'delete'
};

describe("Tests unitarios de aplicación LokiDB + sync-request", function() {
    
    it("Test de ruta POST /car/create. Debería devolver {error: false}. PRIMER TEST UNITARIO.", function() {
        oCarToOperateWith = {
            name: "Test unitario jasmine-node. Campo name.",
            color: "Test unitario jasmine-node. Campo color.",
            manufacturer: "Test unitario jasmine-node. Campo manufacturer.",
            model: "Test unitario jasmine-node. Campo model.",
            year: "Test unitario jasmine-node. Campo year."
        };
        var oRequestCreate = SyncRequest("POST", oURLServices.CREATE, {
            json: oCarToOperateWith            
        });
        var oResponseCreate = JSON.parse(oRequestCreate.body);        
        expect(oResponseCreate.error).toBe(false);
    });
    
    it("Test de ruta POST /car/create. Debería devolver {error: true}", function() {
        oCarToOperateWith = {};
        var oRequestCreate = SyncRequest("POST", oURLServices.CREATE, {
            json: oCarToOperateWith            
        });
        var oResponseCreate = JSON.parse(oRequestCreate.body);        
        expect(oResponseCreate.error).toBe(true);
    });
    
    it("Test de ruta POST /car/read. Debería devolver como mínimo un registro", function() {
        var oRequestRead = SyncRequest("POST", oURLServices.READ);
        var oResponseRead = JSON.parse(oRequestRead.body);
        expect(oResponseRead.length).toBeGreaterThan(0);
        
        oCarToOperateWith = oResponseRead[0];
        expect(oCarToOperateWith.name).toBeDefined();
        expect(oCarToOperateWith.color).toBeDefined();
        expect(oCarToOperateWith.manufacturer).toBeDefined();
        expect(oCarToOperateWith.model).toBeDefined();
        expect(oCarToOperateWith.year).toBeDefined();
    });
    
    it("Test de ruta POST /car/read. Debería devolver un elemento vacío", function() {
        var oRequestRead = SyncRequest("POST", oURLServices.READ, {
            json: {
                index: 10
            }
        });
        var oResponseRead = JSON.parse(oRequestRead.body);
        expect(oResponseRead).toBeNull();
    });
    
    it("Test de ruta POST /car/update. Debería devolver {error: false}", function() {
        oCarToOperateWith.name = 'Nombre editado en test unitarios jasmine-node';        
        var oRequestUpdate = SyncRequest("POST", oURLServices.UPDATE, {
            json: oCarToOperateWith            
        });
        var oResponseUpdate = JSON.parse(oRequestUpdate.body);
        expect(oResponseUpdate.error).toBe(false);                
    });
    
    it("Test de ruta POST /car/update. Debería devolver {error: true}", function() {
        var oIncorrectUpdateCar = {
            name: 'Incorrecto, no tiene todos los campos',
            color: 'Incorrecto, no tiene todos los campos',
            model: 'Incorrecto, no tiene todos los campos'
        };
        var oRequestUpdate = SyncRequest("POST", oURLServices.UPDATE, {
            json: oIncorrectUpdateCar            
        });
        var oResponseUpdate = JSON.parse(oRequestUpdate.body);
        expect(oResponseUpdate.error).toBe(true);
    });
    
    it("Test de ruta POST /car/delete. Debería devolver {error: true}", function() {
        var oIncorrectDeleteCar = {
            name: 'Incorrecto, no podremos borrarlo',
            color: 'Incorrecto, no podremos borrarlo'            
        };
        var oRequestDelete = SyncRequest("POST", oURLServices.UPDATE, {
            json: oIncorrectDeleteCar            
        });
        var oResponseDelete = JSON.parse(oRequestDelete.body);
        expect(oResponseDelete.error).toBe(true);
    });
    
    it("Test de ruta POST /car/delete. Debería devolver {error: false}. ULTIMO TEST UNITARIO." , function() {
        var oRequestDelete = SyncRequest("POST", oURLServices.DELETE, {
            json: oCarToOperateWith            
        });
        var oResponseDelete = JSON.parse(oRequestDelete.body);
        expect(oResponseDelete.error).toBe(false);
    });
            
});