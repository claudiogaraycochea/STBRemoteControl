var config = {
    openSocket: function(config) {
        var channel = 'channel8';//config.channel || location.href.replace( /\/|:|#|%|\.|\[|\]/g , '');
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
            hideUnnecessaryStuff();
		}
    },
    onChannelOpened: function(/* channel */) {
		//document.getElementById('devQRwrapper').style.display="none";
        hideUnnecessaryStuff();
    },
    onChannelMessage: function(data) {
        if (!chatOutput) return;

        /*var tr = document.createElement('tr');
        tr.innerHTML =
            '<td style="width:40%;">' + data.sender + '</td>' +
                '<td>' + data.message + '</td>';

        chatOutput.insertBefore(tr, chatOutput.firstChild);*/
		
		processCommand(data.message);
    }
};

function createGroup(groupID){
    hangoutUI.createRoom({
        userName: '1',//prompt('Enter your name', 'Anonymous'),
        roomName: groupID // (document.getElementById('conference-name') || { }).value || 'Anonymous'
    });
    hideUnnecessaryStuff();
}


/* on page load: get public rooms */
var hangoutUI = hangout(config);

/* UI specific */
var startConferencing = document.getElementById('start-conferencing');

var roomsList = document.getElementById('rooms-list');

var chatOutput = document.getElementById('chat-output');

function hideUnnecessaryStuff() {
    var visibleElements = document.getElementsByClassName('visible'),
        length = visibleElements.length;

    for (var i = 0; i < length; i++) {
        visibleElements[i].style.display = 'none';
    }

    var chatTable = document.getElementById('chat-table');
    if (chatTable) chatTable.style.display = 'block';
    if (chatOutput) chatOutput.style.display = 'block';
    if (chatMessage) chatMessage.disabled = false;
}

var chatMessage = document.getElementById('chat-message');
if (chatMessage)
    chatMessage.onchange = function() {
        hangoutUI.send(this.value);
        /*var tr = document.createElement('tr');
       
		tr.innerHTML =
            '<td style="width:40%;">You:</td>' +
                '<td>' + chatMessage.value + '</td>';

        chatOutput.insertBefore(tr, chatOutput.firstChild);
        chatMessage.value = '';*/
    };


(function() {
    var uniqueToken = document.getElementById('unique-token');
    if (uniqueToken)
        if (location.hash.length > 2) uniqueToken.parentNode.parentNode.parentNode.innerHTML = '<h2 style="text-align:center;"><a href="' + location.href + '" target="_blank">Share this link</a></h2>';
        else uniqueToken.innerHTML = uniqueToken.parentNode.parentNode.href = '#' + (Math.random() * new Date().getTime()).toString(36).toUpperCase().replace( /\./g , '-');
})();



if(defineConnector=='createGroup'){
	//alert('createGroup groupID'+groupID);
//	document.getElementById('devQRwrapper').style.display="block";
	createGroup(groupID);
	devQRConnector();
}

function sendGroup(command){
	hangoutUI.send(command);
}

if(defineConnector=='joinGroup'){
	//alert('joinGroup groupID'+groupID);
}

        function setLocalVar(name,value){
            sessionStorage.setItem(name,value);
        }

        function getLocalVar(name){
            return sessionStorage.getItem(name);
        }

        function devQRConnector(){
            url=URLControl;
			document.getElementById('QRURL').value=url;
            new QRCode(document.getElementById('QRDiv'), url);
        }

		function processCommand(command){
			var data = JSON.parse(command); 
			var to=data.to;
            var from=data.from;
			var func=data.func;
			var param=data.param;	
			executeFunction(func,param);			
		}

	var share = {
		socket: null,
		init: function(defineConnector){
			socket = new WebSocket(wssUrl);
			socket.onopen = function(){
                console.log('WEBRTC CONNECTED');
            }
        },
        sendGroup: function(func,param){
			var command='{"func":"'+func+'","param":"'+param+'"}';
			sendGroup(command);
            alert('SHARE send Group ');
		}
     };   