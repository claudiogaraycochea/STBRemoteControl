//var hostSTB = '10.160.10.200';

var hostSTB = 'tokelocal.com';

var smartTV = {

	/* Inicializa el framework */
    init: function(){
    	console.log('Iniciando smartTV');
    	setInterval(this.listen, 300);
    	smartTV.ready();
    },
	listen: function(){
		var postData='token=xxxxx';
		//url: 'http://'+hostSTB+'/comtrend-1.1.2/api/1.1.2/readinput/',
	  	$.ajax({
	    	url: 'http://'+hostSTB+'/api/readinput',
	    	type: 'GET',
	    	dataType: "json",
	    	data: postData
	    })
	    .success(function(data) {
	    	if(data!=null) {
	    		var data = smartTV.decodeString(data.data);
	    		console.log(data);
	    		smartTV.receive(JSON.parse(data));
	    	}
	    })
	    .fail(function(data) {
	    	return "error";
	  });
	},

	setOutput: function(engineData){
		var engineData=JSON.stringify(engineData);
		var postData='data='+this.encodeString(engineData)+'&token=xxxxx';
	  	$.ajax({
	    	url: 'http://'+hostSTB+'/api/setoutput',
	    	type: 'GET',
	    	dataType: "json",
	    	data: postData
	    })
	    .success(function(data) {
	    	console.log('Enviado a output');
	    })
	    .fail(function(data) {
	    	return "error";
	  	});
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

    send: function(data){
		var engineData = {
			func: data.func,
			param: data.param
		};

		this.setOutput(engineData);
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

}