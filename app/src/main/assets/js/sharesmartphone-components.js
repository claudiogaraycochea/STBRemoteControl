/*
	Sharesmartphone indexer
*/

share.openComponent = function(param){
    var p = share.paramToArray(param);
    switch(p.componentName) {
        case 'ControlMusic': {
            share.openURL('../music/index.html');
            break;
        }
        case 'ControlVideo': {
            share.openURL('../video/index.html');
            break;
        }
        case 'ControlTV': {
            share.openURL('../tv/index.html');
            break;
        }
        default:
            console.log("Componente no declarado");
    }
}