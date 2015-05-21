var data = JSON.parse(share.getLocalVar('engineSelected'));
var defineConnection=data.defineConnection;
var groupID="XdktweW";
var wssUrl="";

var config = {
    openSocket: function(config) {
        var channel = 'channel8';//config.channel || location.href.replace( /\/|:|#|%|\.|\[|\]/g , '');
            
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
        share.consoleLog('Engine WEBRTC conectado');
    },
    onChannelMessage: function(data) {
        if (!chatOutput) return;
        share.receive(JSON.parse(data.message));
    }
};

function createGroup(groupID){
    hangoutUI.createRoom({
        userName: '1',
        roomName: groupID
    });
}


/* on page load: get public rooms */
var hangoutUI = hangout(config);

/* UI specific */
var startConferencing = document.getElementById('start-conferencing');

var roomsList = document.getElementById('rooms-list');

var chatOutput = document.getElementById('chat-output');

var chatMessage = document.getElementById('chat-message');
if (chatMessage)
    chatMessage.onchange = function() {
        hangoutUI.send(this.value);
    };


(function() {
    var uniqueToken = document.getElementById('unique-token');
    if (uniqueToken)
        if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
        else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace( /\./g , '-');
})();

socket: null;

share.initWebRTC = function (wssUrl){

    socket = new WebSocket(wssUrl);
    socket.onopen = function(){
        console.log('WEBRTC CONNECTED');
    }
}

share.send = function (data){
    var command='{"func":"'+data.func+'","param":"'+data.param+'"}';
    hangoutUI.send(command);
}

if(defineConnection == 'createGroup'){
    share.consoleLog('Inicializando modo createGroup');
    groupID="XdktweW";
    createGroup(groupID);
}
else
if(defineConnection == 'joinGroup'){
    share.consoleLog('Inicializando modo joinGroup');
    groupID="XdktweW";
}

share.initWebRTC(wssUrl);