function setLocalVar(name,value){
	sessionStorage.setItem(name,value);
}

function getLocalVar(name){
	return sessionStorage.getItem(name);
}

function getURLParam(name){
	if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	return decodeURIComponent(name[1]);
} 
var method=getURLParam('method');

if(method==2){
	setLocalVar('method',getURLParam('method'));
	setLocalVar('deviceID',getURLParam('deviceID'));
	setLocalVar('deviceIDCounter',getURLParam('deviceIDCounter'));
	setLocalVar('groupID',getURLParam('groupID'));
	setLocalVar('remoteControl',getURLParam('remoteControl'));
	setLocalVar('to',getURLParam('to'));
	setLocalVar('typeConnector',getURLParam('typeConnector'));
	setLocalVar('isSeted','seted');
}
