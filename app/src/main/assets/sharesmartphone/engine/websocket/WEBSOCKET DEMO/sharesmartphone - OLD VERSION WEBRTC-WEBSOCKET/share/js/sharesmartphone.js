    function getLocalVar(name){
        return sessionStorage.getItem(name);
    }

    function setLocalVar(name,value){
        sessionStorage.setItem(name,value);
    }

    setLocalVar("method","2");

    var method=getLocalVar("method");
	var host="http://10.50.15.113/sharesmartphone/";

    if (method=="1"){
        document.write("<script type='text/javascript' src='"+host+"engine/1/js/webrtc.js'></"+"script>");
    }
    else
    if (method=="2"){
        document.write("<script type='text/javascript' src='"+host+"engine/2/js/sharesmartphone-1.0.12.js'></"+"script>");
    }
    else {
        document.write("<script type='text/javascript' src='"+host+"engine/0/js/sharesmartphone-noconnect.js'></"+"script>");
    }

