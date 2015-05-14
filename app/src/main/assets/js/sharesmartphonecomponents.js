/*
	Sharesmartphone indexer
*/

        function openControlMusic(){
            $(location).attr('href', '../music/index.html');
        }

        function openControlVideo(){
            $(location).attr('href', '../video/index.html');
        }

        function openControlTV(){
            $(location).attr('href', '../tv/index.html');
        }

        function openControlJoystick(){
            $(location).attr('href', '../joystick/index.html');
        }

        /* Abre un componente */
        function openComponent(param){
            var p = share.paramToArray(param);
            share.consoleLog('openComponent '+p.componentName+' > url:'+p.url);
            switch(p.componentName) {
                case 'ControlMusic':{
                    openControlMusic();
                    break;
                }
                case 'ControlVideo':{
                    openControlVideo();
                    break;
                }
                case 'ControlTV':{
                    openControlTV();
                    break;
                }
                case 'ControlJoystick':{
                    openControlJoystick();
                    break;
                }
                default:
                    console.log("Componente no declarado");
            }
        }