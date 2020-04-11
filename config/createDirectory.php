<?php
    function createDirectory(){
        $today = date("Y.m.d");
        $hash = bin2hex(random_bytes(16));
        $directory_name = $today."_".$hash;
        
        // Create directory        
        chdir($_SERVER["DOCUMENT_ROOT"] . "/result");
        if (!mkdir($directory_name, 0777, true)) {
            return ["type" => "fail", "message" => "Failed to create folders."];
        }
        return ["type" => "success", "directoryName" => $directory_name];
    }
?>