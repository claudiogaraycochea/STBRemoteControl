/*
    /createGroup
    /joinGroup GROUP
    /sendMessage GROUP MESSAGE
*/
//var ipaddress = 'localhost';
//var ipaddress = '192.168.1.33';
var ipaddress = '10.50.15.113';
var port = 443;
var maxBytes = 500; // Max bytes to dataEncripted

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({host:ipaddress, port:port});
var groups=new Array;
var numClient=0;

wss.createGroup = function(data){
    clientID = this.newClient();
    groupID = wss.encript(clientID,3);
	dataEncripted='';
    var device = { 
        socket : data,
        deviceID : clientID
    };        
    groups[groupID] = new Array;
    groups[groupID].push(device);
	dataEncripted='{"func":"createGroupOk","param":"groupID='+groupID+'&deviceID='+clientID+'"}';
    wss.privateSendGroup(groups[groupID],dataEncripted);
};

wss.privateSendGroup = function(groupList, dataEncripted){
    for (var i in groupList){
		if(groupList[i].socket.onerror==undefined){
			if(dataEncripted.length>maxBytes) dataEncripted=dataEncripted.substr(0, maxBytes);
			groupList[i].socket.send(groupList[i].deviceID+">"+dataEncripted);
        	console.log(groupList[i].deviceID+">"+dataEncripted);
		}
    }
}

wss.sendGroup = function(param){
	groupID = param.split(' ')[0];
	dataEncripted = param.replace(groupID, '');
	dataEncripted = dataEncripted.substr(1,dataEncripted.length); // Clear white space
	if(dataEncripted!=''){
		if(groups[groupID]!=null) {
			console.log("\r\nGroupID: "+groupID);
        	wss.privateSendGroup(groups[groupID], dataEncripted);
    	}
	}
};

wss.joinGroup = function(data,param){
    clientID=this.newClient();
    groupID=param;
	dataEncripted='';
    if(groups[groupID]!=null) {
        var device = { 
            socket : data,
            deviceID : clientID
        };        
        groups[groupID].push(device);
		dataEncripted='{"func":"joinGroupOk","param":"groupID='+groupID+'&deviceID='+clientID+'"}';
        wss.privateSendGroup(groups[groupID],dataEncripted);  
    }
};

wss.removeClient = function(data) {
    for(var j in groups){
		groupList=groups[j];
		for (var i in groupList){
			if(groupList[i].socket.onerror!=undefined){
				groupList.splice(i,1);
			}
		}
	}
    console.log('\r\nClient left');
};

wss.encript = function(str,L){
    var s= '';
    var randomchar=function(){
    	var n= Math.floor(Math.random()*62);
    	if(n<10) return n; 
    	if(n<36) return String.fromCharCode(n+55); 
    	return String.fromCharCode(n+61); 
    }
    while(s.length< L) s+= randomchar();
    return s+str;
}

wss.newClient = function(){
    numClient+=1;
    return numClient;
};

wss.on('connection', function(ws) {
	ws.on('message', function(data) {
		var cmd = '';
		var param = '';
		if(data.indexOf('/') === 0){
			cmd = data.split(' ')[0];
			param = data.replace(cmd, '');
            param= param.replace(' ', '');
		}
		switch(cmd){
			case '/sendGroup': 
				wss.sendGroup(param);
				break;
			case '/createGroup':
				wss.createGroup(ws);
				break;
			case '/joinGroup':
                wss.joinGroup(ws,param);
				break;
		}
    });
    ws.on('close', function() {
        wss.removeClient(ws);
	});
});