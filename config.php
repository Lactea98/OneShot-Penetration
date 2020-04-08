<?php
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));
    $data = json_decode($content, true);
    
    // check hosts
    if(!isset($data["hosts"])){
      $message = ["type" => "error", "message" => "Input hosts" ];
    }
    else{
      if($data["checkbox"]["subdomain"] === true){
        require $_SERVER['DOCUMENT_ROOT']."/config/subdomain.php";
        $message = subdomain($data["hosts"]);
      }
      if($data["checkbox"]["port"] === true){
        
      }
      if($data["checkbox"]["s3"] === true){
        
      }
      if($data["checkbox"]["smuggling"] === true){
        
      }
    }
    
    header('Content-type: application/json');
    echo json_encode( $message );
  }
?>