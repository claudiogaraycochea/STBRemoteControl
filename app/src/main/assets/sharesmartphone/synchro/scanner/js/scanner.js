share.consoleLog('Iniciando escanner');

share.start = function(){
	share.getScannerList(share.getScannerLocalVar());
}

/* Retorna JSON de dispositivos en cookie */
share.getScannerLocalVar = function(){
	share.consoleLog('Forzar conexion a STB fijo');
	
	var data = '';
	
	var STBTest = { 
		engineTitle: 'Telefónica STB',
		engine: 'stb',
		STBIPLocal: '192.168.1.12'
	};

	var websocketTest = {
		engineTitle: 'Ordenador',
		engine: 'websocket',
		wsHost: '192.168.1.33',
		wsgroupID: 'xEW20',
		wsTo: '20'
	};
	
	var scannerLocalVar='['+JSON.stringify(STBTest)+','+JSON.stringify(websocketTest)+']';
	
	share.setLocalVar('scannerList',scannerLocalVar);
	
	data=share.getLocalVar('scannerList');

	return data;
}

share.scannerConnect = function(dataString){
	
	share.consoleLog('Conectando dispositivo seleccionado, por favor espere...');
	share.consoleLog('Datos de conexión '+dataString);
}

share.getLocalVarScannerListID = function(selected){
	var data = share.getLocalVar('scannerList');
    var data = JSON.parse(data);

    for(i=0;i<data.length;i++){
    	if (i==selected)
        	return data[i];
    } 

}

share.start();