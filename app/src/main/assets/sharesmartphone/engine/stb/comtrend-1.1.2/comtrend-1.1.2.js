/*
	API soportada por dispositivo Comtrend modelo 1.1.2
*/

share.initSTB = function (){
	share.consoleLog('Conectando Comtrend-1.1.2');	

	/* Inicializa API */

},

share.getAPI = function(engineData){
	/*$http({
			url: $scope.urlPath+"api/v1.0.1/groups/?q="+$scope.q,
			method: "GET"
		}).success(function(data, status, headers, config) {
			for(i=0;i<data.length;i++){
				item={
					"ID": data[i].product_group,
					"Name":data[i].product_group_name						
				}
				$scope.groups.push(item);
			}
		}).error(function(data, status, headers, config) {
			$scope.status = status;
			console.log="Error al abrir el estado";
	});*/
	var postData="token=xxxxxx";

  $.ajax({
      url: 'http://10.160.10.200/comtrend-1.1.2/api/1.1.2/broadcast/',
      type: 'POST',
      dataType: "json",
      //dataType: "json",
      data: postData,
    })
    .done(function(data) {
      alert('done');
    })
    .success(function(data) {
      alert('success');
    })
    .fail(function(data) {
      alert('Error');
  });

},

share.send = function(engineData){
	alert('Share.send - Enviando al STB Comtrend-1.1.2');

	share.getAPI(engineData);
}

share.initSTB();

