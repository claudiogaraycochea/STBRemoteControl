var hostBase = "../../../../";
var share = {

	/* Inicializa el framework */
    init: function(data){

    	if (data.defineConnection=='joinGroup'){
    		this.joinGroup(data);
    	}
    	else
	    	if (data.defineConnection=='createGroup'){
	    		this.createGroup(data);
	    	}
	    	else {
		    	this.consoleLog('Variable defineConnection no definida.');
	    	}
    },

    /* Unir al grupo */
    createGroup: function(data){
   		this.consoleLog('Iniciando modo createGroup...');
   		this.setLocalVarObj(data);
   	},

    /* Unir al grupo */
    joinGroup: function(data){
   		this.consoleLog('Iniciando modo joinGroup...');
   		this.setLocalVarObj(data);

        switch(data.synchroMethod) {
            case 'scanner':{
                this.openJS(hostBase+'sharesmartphone/synchro/scanner/js/scanner.js');
                break;
            }
            case 'qr':{
                this.openJS(hostBase+'sharesmartphone/synchro/qr/js/qr.js');
                break;
            }
            case 'token':{
                this.openJS(hostBase+'sharesmartphone/synchro/token/js/token.js');
                break;
            }
            default:
                share.consoleLog("synchroMethod no declarado");
        }

    },
    
    getEngineSTB: function(data){
        this.openJS(hostBase+'sharesmartphone/engine/stb/js/stb.js');
    },

    getEngineWebsocket: function(data){
    	this.consoleLog('Generando conexión con Websocket...');
    },

    getEngineWebrtc: function(data){
    	this.consoleLog('Generando conexión con Webrtc...');
    },

    /* Mostrar consola */
    consoleLog: function(dataString){
    	$('.js-consoleLog').append(dataString+"<br>");
    	console.log(dataString);
    },

    openJS: function(url){
        var script = document.createElement('script');
        script.src = url+'?'+Math.random();
        document.documentElement.lastChild.appendChild(script);
    },

    /* Set cookies de un objeto */
	setLocalVarObj: function(data){
		this.consoleLog('Seteando cookies de inicio de conexión...');
		var dataList=[];
		var dataListResult=[];
		$.each(data, function(i,n) {
			share.setLocalVar(i,n);
    	});
	},

    /* Set cookie */
    setLocalVar: function(name,value){
        sessionStorage.setItem(name,value);
    },

    /* Get cookie */
    getLocalVar: function(name){
        return sessionStorage.getItem(name);
    },

    /* Codifica cadena */
    encodeString: function(string){
        var encodedString = btoa(string);
        return encodedString;
    },

    /* Decodifica cadena */
    decodeString: function(encodedString){
        var decodedString = atob(encodedString);
        return decodedString;
    },

    connectEngine: function(data){
        
        switch(data.engine) {
            case 'stb':{
                this.setLocalVar('engineSelected',JSON.stringify(data));
                this.getEngineSTB();
                break;            
            }
            case 'webrtc':{
                this.setLocalVar('engineSelected',JSON.stringify(data));
                share.getEngineWebrtc();
                break;            
            }
            case 'websocket':{
                this.setLocalVar('engineSelected',JSON.stringify(data));
                share.getEngineWebsocket();
                break;            
            }
            default:
                share.consoleLog("Engine no declarado");
        }
    },

}

