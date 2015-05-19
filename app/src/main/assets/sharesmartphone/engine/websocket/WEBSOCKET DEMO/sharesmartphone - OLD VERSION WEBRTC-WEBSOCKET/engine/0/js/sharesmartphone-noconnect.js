alert("no connection");

	var socket;

	var share = {
		socket: null,
		init: function(defineConnector,URLControl){
			console.log("no connection");
        },

		sendGroup: function(func,param){
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
						
		},

		openCreatorPage: function(){
		},
		
        setLocalVar: function(name,value){
        },

        getLocalVar: function(name){
          
        },   
        
        createGroupOk: function(groupID,deviceID){
		
        },
        
        joinGroupOk: function(groupID,deviceID){
		
        },
        
		setGroupCreator: function(to,from){
		
		},
        
        setDeviceIDCounter: function(){
           
        },
		
        openURL: function(url){
           
        },
        
        displayStatus: function(result){
           
        },

        displayConsole: function(result){
          
        },

        devQRConnector: function(devQR){
            
        },        
        
        functionReserved: function(func,param){
            console.log("Command not found!");
        },
        shareSetRemoteControl: function(URLControl){
        },
		close: function(){
		}
	};
		
