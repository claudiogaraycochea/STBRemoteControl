var data = JSON.parse(share.getLocalVar('engineSelected'));
var defineConnection=data.defineConnection;
var groupID=data.groupID;
//var groupID="XdktweW";
var wssUrl="";

var config = {
    openSocket: function(config) {
        var channel = 'channel8';            
        //var socket = new Firebase('https://trip-chronicle.firebaseio.com/' + channel);
        var socket = new Firebase('https://webrtc-signaling.firebaseio.com/' + channel);
        socket.channel = channel;
        socket.on("child_added", function(data) {
            config.onmessage && config.onmessage(data.val());
        });

        socket.send = function(data) {
            this.push(data);
        };

        config.onopen && setTimeout(config.onopen, 1);
        socket.onDisconnect().remove();
        return socket;
    },
    onRoomFound: function(room) {
		if(room.roomName==groupID){
			hangoutUI.joinRoom({
                roomToken: room.roomToken,
                joinUser: room.broadcaster,
                userName: 'guest'
            });
		}
    },
    onChannelOpened: function(/* channel */) {
        var data = {
            func: 'ready'
        };
        share.send(data);
        share.consoleLog('Engine WEBRTC conectado');
    },
    onChannelMessage: function(data) {
        share.receive(JSON.parse(data.message));
    }
};

function createGroup(groupID){
    hangoutUI.createRoom({
        userName: '1',
        roomName: groupID
    });
}

var hangoutUI = hangout(config);

socket: null;

share.initWebRTC = function (wssUrl){
    socket = new WebSocket(wssUrl);
    socket.onopen = function(){
        console.log('WEBRTC CONNECTED');
    }
}

share.send = function (data){
    var data='{"func":"'+data.func+'","param":"'+data.param+'"}';
    hangoutUI.send(data);
}

if(defineConnection == 'createGroup'){
    share.consoleLog('Inicializando modo createGroup');
    groupID="XdktweW";
    createGroup(groupID);
}
else
    if(defineConnection == 'joinGroup'){
        share.consoleLog('Inicializando modo joinGroup');
    }

share.initWebRTC(wssUrl);