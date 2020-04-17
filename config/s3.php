<?php
    ////////////////////////////////////////////////////
    // [*] Parameters: string, string
    // [*] Example: $hosts         = "test.com"
    //              $directoryName = "{y.m.d}_{randomHash}"
    // [*] Return: json type
    function s3($hosts, $directoryName){
        chdir($_SERVER["DOCUMENT_ROOT"] . "/result/" . $directoryName);
        if(!file_exists("domains")){
            exec("echo " . escapeshellcmd($hosts) . " > domains");
        }
        shell_exec("cat domains | httprobe | tee hosts");
        shell_exec("meg -d 1000 /");
        shell_exec($_SERVER["DOCUMENT_ROOT"] . "/result/chmod.sh");
        chdir("./out");
        shell_exec("gf s3-buckets | sort | uniq > buckets");
        exec("cat buckets", $output);
        
        $result = s3TakeOverCheck($output);
        
        return [
            "type" => "success",
            "buckets" => $output,
            "host" => $hosts,
            "result" => $result
        ];
    }
    ////////////////////////////////////////////////////
    
    
    ////////////////////////////////////////////////////
    // [*] Parameter: $buckets = array()
    // [*] Example: $buckets = ["test.s3.amazonaws.com", "..."]
    // [*] Return: Array
    function s3TakeOverCheck($buckets){
        $result = Array();
        exec("s3reverse -iL buckets -verify", $output);
        
        return $output;
    }
    ////////////////////////////////////////////////////
?>