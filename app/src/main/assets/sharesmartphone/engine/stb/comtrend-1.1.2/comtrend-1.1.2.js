/*
	API soportada por dispositivo Comtrend modelo 1.1.2
*/

var hostSTB = '10.160.10.200';

share.initSTB = function (){
	share.consoleLog('Conectando Comtrend-1.1.2');	

	/* Inicializa API */
  share.listenerSTB();
},

share.listenerSTB = function(){
  var engineData = {
    APICommand: 'output'
  };
  var data = share.getAPIResponse(engineData);
  alert('vvvvvvvvvvvvvvvvvvvvvvvv        '+data);
//  share.receive(JSON.stringify(data));
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
      alert(' data getAPIResponse: '+data.data);
      return data.data;
    })
    .fail(function(data) {
      return "error";
  });
},

share.send = function(data){
	share.consoleLog('Share.send func:'+data.func+' / param:'+data.param+' - para STB Comtrend-1.1.2');
  var engineData = {
    func: data.func,
    param: data.param,
    APICommand: 'input'
  };
  var data = share.getAPIResponse(engineData);
  //alert('Result Api:'+data);
}

share.initSTB();

