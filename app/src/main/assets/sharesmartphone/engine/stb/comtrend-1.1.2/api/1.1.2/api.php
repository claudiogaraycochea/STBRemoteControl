<?php
	error_reporting(E_ERROR | E_WARNING | E_PARSE);
	require_once("rest.php");
	
	class API extends REST {
	
		public $data = "";
		
        private $db = NULL;
	
		public function __construct(){
			parent::__construct();				// Init parent contructor
		}
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['rquest'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404);				// If the method not exist with in this class, response would be "Page not found".
		}
		
	    //GET BROADCAST
		private function broadcast(){	
			// Cross validation if the request method is GET else it will return "Not Acceptable" status
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$token = $this->_request['token'];
           
            if($token!=''){
				$data_result['model']='comtrend-1.1.2';
				$data_result['engineTitle']='Telefónica STB';
                // If success everythig is good send header as "OK" and return list of users in JSON format
				$this->response($this->json($data_result), 200);
			}
			$this->response('',204);	// If no records "No Content" status
		}

		//INPUT
		private function input(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$token = $this->_request['token'];
			$data = $this->_request['data'];
           
            if($token!=''){
				$data_result['data']=$data;
				$file = 'input.txt'; // file to listen smartphone
				file_put_contents($file, $data);

                // If success everythig is good send header as "OK" and return list of users in JSON format
				$this->response($this->json($data_result), 200);
			}
			$this->response('',204);	// If no records "No Content" status
		}
        
		//OUTPUT
		private function output(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$token = $this->_request['token'];
          
            if($token!=''){
            	$file = 'output.txt'; // file to listen STB from smartphone
				$current = file_get_contents($file);
				$data_result['data'] = $current;

                // If success everythig is good send header as "OK" and return list of users in JSON format
				$this->response($this->json($data_result), 200);
			}
			$this->response('',204);	// If no records "No Content" status
		}

		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}


	}
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>