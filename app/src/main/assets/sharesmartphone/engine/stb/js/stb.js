share.consoleLog('Iniciando conexión con STB...');

share.initSTB = function(){
	var data = JSON.parse(share.getLocalVar('engineSelected'));
    switch(data.model) {
        case 'comtrend-1.1.2':{
            share.openJS(hostBase+'sharesmartphone/engine/stb/comtrend-1.1.2/comtrend-1.1.2.js');
            break;            
        }
        case 'onvideo-1':{
            share.openJS(hostBase+'sharesmartphone/engine/stb/onvideo-1/onvideo-1.js');
            break;            
        }
        default:
            share.consoleLog("STB Model no reconocido");
    }
}

share.initSTB();
