var hostSTB = '10.160.10.200';

var smartTV = {

	/* Inicializa el framework */
    init: function(){
    	console.log('Iniciando smartTV');
    	setInterval(this.listen, 500);
    },
	listen: function(){
		var postData='token=xxxxx';
	  	$.ajax({
	    	url: 'http://'+hostSTB+'/comtrend-1.1.2/api/1.1.2/readinput/',
	    	type: 'POST',
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
	    	url: 'http://'+hostSTB+'/comtrend-1.1.2/api/1.1.2/setoutput/',
	    	type: 'POST',
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
    }

}