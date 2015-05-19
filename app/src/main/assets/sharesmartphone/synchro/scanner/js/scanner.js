/* Indica el inicio de scanner*/
share.consoleLog('Iniciando escanner...');

share.start = function(){
	share.getScannerList(share.getScannerLocalVar());
}

/* Retorna JSON de dispositivos en cookie */
share.getScannerLocalVar = function(){
	share.consoleLog('Forzando conexión Test a STB y ordenador');
	
	var data = '';
	
	var STBTelefonicaTest = { 
		engineTitle: 'Telefónica STB',
		engine: 'stb',
		STBIPLocal: '192.168.1.12',
		model: 'comtrend-1.1.2'
	};

	var STBOnvideoTest = { 
		engineTitle: 'Onvideo STB',
		engine: 'stb',
		STBIPLocal: '192.168.1.13',
		model: 'onvideo-1'
	};

	var ordenadorWebsocket = {
		engineTitle: 'Ordenador Websocket',
		engine: 'websocket',
		wsHost: '192.168.1.33'
	};

	var ordenadorWebRTC = {
		engineTitle: 'Ordenador WebRTC',
		engine: 'webrtc',
		wsHost: '192.168.1.33'
	};

	var scannerLocalVar='['+JSON.stringify(STBTelefonicaTest)+','+JSON.stringify(STBOnvideoTest)+','+JSON.stringify(ordenadorWebsocket)+','+JSON.stringify(ordenadorWebRTC)+']';
	
	/* todos los dispositivos encontrados se almacenan en la cookie */
	share.setLocalVar('scannerList',scannerLocalVar);
	
	/* retorna los valores de la lista en la cookie*/
	data=share.getLocalVar('scannerList');

	return data;
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