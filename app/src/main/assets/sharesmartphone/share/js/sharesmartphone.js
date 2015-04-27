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
   		this.consoleLog('Iniciando createGroup');
   		this.setLocalVarObj(data);
   	},

    /* Unir al grupo */
    joinGroup: function(data){
   		this.consoleLog('Iniciando joinGroup');
   		this.setLocalVarObj(data);

    	var engineList=data.engineOrder.split(',');
    	
	    switch(engineList['0']) {
	        case 'stb':{
				this.engineSTB();
	            break;            
	        }
	        case 'ws':{
				this.engineWS();
	            break;            
	        }
	        case 'webrtc':{
				this.engineWEBRTC();
	            break;            
	        }
	        default:
	            this.consoleLog("El engineOrder no esta definido o no es soportado.");
	    }
    },
    
    engineSTB: function(){
    	this.consoleLog('Generando conexión con STB');
		var script = document.createElement('script');
		script.src = '../sharesmartphone/engine/stb/js/stb.js?'+Math.random();
 		document.documentElement.firstChild.appendChild(script);
    },

    engineWS: function(){
    	this.consoleLog('Generando conexión con WS');
    },

    engineWEBRTC: function(){
    	this.consoleLog('Generando conexión con WEBRTC');
    },

    /* Mostrar consola */
    consoleLog: function(dataString){
    	$('.js-consoleLog').append(dataString+"<br>");
    	console.log(dataString);
    },

    /* Set cookies de un objeto */
	setLocalVarObj: function(data){
		this.consoleLog('Seteando cookies de inicio');
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


}

