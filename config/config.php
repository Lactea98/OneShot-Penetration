<?php
  $contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

  if ($contentType === "application/json") {
    include $_SERVER['DOCUMENT_ROOT'] . "/config/createDirectory.php";
    
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));
    $data = json_decode($content, true);
    
    if($data["mode"] === "createDirectory"){
      $message = createDirectory();
    }
    else if(!isset($data["hosts"])){
      $message = ["type" => "error", "message" => "Input hosts" ];
    }
    else{
      if($data["mode"] === "subdomain"){
        require $_SERVER['DOCUMENT_ROOT']."/config/subdomain.php";
        $message = subdomain($data["hosts"]);
      }
      else if($data["mode"] === "smuggling"){
        require $_SERVER["DOCUMENT_ROOT"]."/config/smuggling.php";
        $message = smuggling($data["hosts"]);
      }
      else if($data["mode"] === "s3"){
        require $_SERVER["DOCUMENT_ROOT"]."/config/s3.php";
        $message = s3($data["hosts"], $data["directoryName"]);
      }
      else if($data["mode"] === "port"){
        
      }
    }
    
    header('Content-type: application/json');
    echo json_encode( $message );
  }
?>