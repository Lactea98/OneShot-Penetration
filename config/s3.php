<?php
    ////////////////////////////////////////////////////
    // [*] Parameters: string, string
    // [*] Example: $hosts         = "test.com"
    //              $directoryName = "{y.m.d}_{randomHash}"
    // [*] Return: json type
    function s3($hosts, $directoryName){
        // // Check if $directory == null
        // if(!isset($direcyoryName)){
        //     $result = createDirectory();
        
        //     if($result["type"] == "fail"){
        //         return $result;
        //     }
        //     $directoryName = $result["directoryName"];
        // }
        
        chdir($_SERVER["DOCUMENT_ROOT"] . "/result/" . $directoryName);
        if(!file_exists("domains")){
            exec("echo " . escapeshellcmd($hosts) . " > domains");
        }
        exec("cat domains | httprobe | tee hosts");
        exec("meg -d 1000 / ; cd out ; gf s3-buckets | s3reverse -tV > buckets");
        exec("cat bockets", $output);
        
        return [
            "type" => "success",
            "buckets" => $output
        ];
    }
    ////////////////////////////////////////////////////
?>