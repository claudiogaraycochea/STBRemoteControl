/*
	API soportada por dispositivo Comtrend modelo 1.1.2
*/

var hostSTB = '10.160.10.200';

share.initSTB = function (){
	share.consoleLog('Conectando Comtrend-1.1.2');	

	/* Inicializa API */
  setInterval(this.listenerSTB, 3000);
},

share.listenerSTB = function(){
  var engineData = {
    APICommand: 'output'
  };
  share.getAPIResponse(engineData);
},

share.getAPIResponse = function(engineData){
  var APICommand=engineData.APICommand;
  var engineData=JSON.stringify(engineData);
  var postData='data='+share.encodeString(engineData)+'&token=xxxxx';

  $.ajax({
      url: 'http://'+hostSTB+'/comtrend-1.1.2/api/1.1.2/'+APICommand+'/',
      type: 'POST',
      dataType: "json",
      data: postData
    })
    .success(function(data) {
      if(data!=null){
        var data=share.decodeString(data.data);
        if(APICommand=='output'){
          share.receive(JSON.parse(data));
        }
      }
    })
    .fail(function(data) {
      return "error";
  });
},

share.send = function(data){
	share.consoleLog('shareSend > func:'+data.func+' / param:'+data.param+' - para STB Comtrend-1.1.2');
  var engineData = {
    func: data.func,
    param: data.param,
    APICommand: 'input'
  };
  share.getAPIResponse(engineData);
}

share.initSTB();

