	var wssUrl = "ws://localhost:32768";
//var wssUrl = "ws://217.160.235.220:32768";
    
	var socket;

	var share = {
		socket: null,
		init: function(defineConnector){
			socket = new WebSocket(wssUrl);
			socket.onopen = function(){
            	if(share.openCreatorPage()){
					shareSetRemoteControl();
					share.displayStatus("Connected");
				}

				console.log('Connected');
                
				switch(defineConnector){
                    case 'createGroup': {
                        socket.send('/createGroup');
                        break;
					}
                    case 'joinGroup':{
						var groupID=share.getURLParam("groupID");
                        if(groupID===undefined){
                            var groupID=share.getLocalVar("groupID");
                            if(groupID=='undefined'){
                                console.log('No session available');
                                break;
                            }
                        }
				        socket.send('/joinGroup '+groupID);
                        break;
                    }
                }
                
			};

			socket.onmessage = function (evt) { 
                share.processCommand(evt.data);
			};

			socket.onclose = function() {
				console.log("Connection closed in web");
			};

        },

		sendGroup: function(func,param){
            var groupID=share.getLocalVar("groupID");
            var to=share.getLocalVar("to");
            var from=share.getLocalVar("deviceID");
            var data='/sendGroup '+groupID+' {"to":"'+to+'","from":"'+from+'","func":"'+func+'","param":"'+param+'"}';
            socket.send(data);
		},

	    getURLParam: function(name){
            if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
        },        
        
        encodeString: function(string,key){
            var encodedString = btoa(string);
            return encodedString;
        },

        decodeString: function(string,key){
            var decodedString = atob(encodedString);
            return encodedString;
        },
      
        getArrayParam : function(param){
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
		
		compareArray: function(to,deviceID){
			if((to!=undefined)&&(deviceID!=null)){
				var toArray=to.split(',');
				for(i=0;i<toArray.length;i++){
					if(toArray[i]==deviceID){
						return true;	
					}
				}
			}
			if((to==undefined)&&(deviceID==null))
				return true;

			return false;
		},
		
		processCommand: function(command){
			var deviceID = command.split('>')[0];
			var dataEncripted = command.replace(deviceID, '');
			dataEncripted = dataEncripted.substr(1,dataEncripted.length); // Clear > of string			
			console.log(deviceID+'>'+dataEncripted);			
			var data = JSON.parse(dataEncripted); 
			var to=data.to;
            var from=data.from;
			var func=data.func;
			var param=data.param;	
			if(share.compareArray(to,share.getLocalVar("deviceID"))){
				executeFunction(func,param);
			}
			
		},

		openCreatorPage: function(){
			if(share.getLocalVar("typeConnector")=="creator"){
				return true;
			}
		},
		
        setLocalVar: function(name,value){
            sessionStorage.setItem(name,value);
        },

        getLocalVar: function(name){
            return sessionStorage.getItem(name);
        },   
        
        createGroupOk: function(groupID,deviceID){
			if(share.getLocalVar("groupID")===null){
				share.setLocalVar("groupID",groupID);
				share.setLocalVar("deviceID",deviceID);
				share.setLocalVar("deviceIDCounter","0");
				share.setLocalVar("typeConnector","creator");
				share.setLocalVar("to","");
				share.setLocalVar("remoteControl","none");
                share.devQRConnector(QRConnector);
			}
        },
        
        joinGroupOk: function(groupID,deviceID){
			if(share.getLocalVar("groupID")===null){
				share.setLocalVar("groupID",groupID);
				share.setLocalVar("deviceID",deviceID);
				if(share.getURLParam("to")!=''){
					var to=new Array();
					to.push(share.getURLParam("to"));
					share.setLocalVar("to",to);	share.sendGroup("setGroupCreator","to="+share.getLocalVar("to")+"&from="+deviceID);
				}
			}           
        },
        
		setGroupCreator: function(to,from){
			if(share.getLocalVar("to")==''){
				to=from;
			}
			else{
				to=share.getLocalVar("to")+","+from;	
			}
			share.setLocalVar("to",to);
           
            share.setDeviceIDCounter();
		},
        
        setDeviceIDCounter: function(){
            if(share.getLocalVar("typeConnector")=="creator"){
                var toArray=share.getLocalVar("to").split(',');
				share.setLocalVar("deviceIDCounter",toArray.length);
                share.displayStatus(share.getLocalVar("deviceIDCounter")+" devices connected");
                shareDeviceJoined();
            }
        },
		
        openURL: function(url){
            var url=decodeURI(url);
            $(location).attr('href', url);
        },
        
        displayStatus: function(result){
            if(share.getLocalVar("typeConnector")=="creator"){
                $('.'+divStatus).attr('style','display:block;');
                $('.'+divStatus).html(result);
                $('.'+divStatus).fadeOut( 2000, function() {});
            }
        },

        displayConsole: function(result){
            if(divConsole!='')
                $('.'+divConsole).html(result);
            console.log(result);
        },

        devQRConnector: function(devQR){
            url=URLControl+'?groupID='+share.getLocalVar("groupID")+'&to='+share.getLocalVar("deviceID");
            $("."+devQR+"URL").val(url);
            new QRCode(document.getElementById(devQR), url);
        },        
        
        functionReserved: function(func,param){
            switch(func) {
                case 'createGroupOk':{
					share.createGroupOk(param["groupID"],param["deviceID"]);
                    break;            
                }
                case 'joinGroupOk':{
                    share.joinGroupOk(param["groupID"],param["deviceID"]);
                    break;            
                }
                case 'setGroupCreator':{
                    share.setGroupCreator(param["to"],param["from"]);
                    break;            
                }	
                case 'openURL':{
                    share.openURL(param["url"]);
                    break;            
                }
                default:
                    console.log("Command not found!");
            }
        },
        
		close: function(){
			socket.close();
		}
	};
		
