//var hostBase = "../../../../"; // PARA TEST
//var hostBase = "../";
var share = {

	/* Inicializa el framework */
    init: function(data){
        if(this.getLocalVar('engineSelected')!=null){
            var data = JSON.parse(this.getLocalVar('engineSelected'));
            share.connectEngine(data);
        }
        else{
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
        }    
    },

    /* Crear grupo */
    createGroup: function(data){
   		this.consoleLog('Iniciando modo createGroup...');
        var engineArray=data.engineOrder.split(",");
        var data = {
            "defineConnection": data.defineConnection,
            "engineTitle": data.engineTitle,
            "engine": engineArray[0],
            "tag": data.tag,
        }
        this.connectEngine(data);
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
    
    /* llama a motor de STB */
    getEngineSTB: function(data){
        this.openJS(hostBase+'sharesmartphone/engine/stb/js/stb.js');
    },

    /* llama a motoro websocket */
    getEngineWebsocket: function(data){
    	this.consoleLog('Generando conexión con Websocket...');
    },

    /* llama a motor webrtc*/
    getEngineWebrtc: function(data){
        this.openJS(hostBase+'sharesmartphone/engine/webrtc/js/webrtc.js');
    },

    /* Mostrar consola */
    consoleLog: function(dataString){
    	$('.js-consoleLog').prepend(dataString+"<br>");
    	console.log(dataString);
    },

    /* Incluye ficheros js en html */
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

    reserved: function(func,param){
        switch(func) {
            case 'openLayer':{
                alert('Abre layer'+param);
                break;            
            }
            default:
                share.consoleLog("Función \""+func+"\" no declarada en este componente");
        }
    },

    paramToArray : function(param){
        var p= new Array();
        if(param!=undefined){
            var ps=param.split("&");
            $.each(ps, function( key, value ) {
                var pm=value.split("=");
                p[pm[0]]=pm[1];
            });
            return p;
        }
    },

    openURL : function(url){
        $(location).attr('href', url);
    },

    delay : function(ms) {
        var cur_d = new Date();
        var cur_ticks = cur_d.getTime();
        var ms_passed = 0;
        while(ms_passed < ms) {
            var d = new Date();  // Possible memory leak?
            var ticks = d.getTime();
            ms_passed = ticks - cur_ticks;
            // d = null;  // Prevent memory leak?
        }
    }

}

