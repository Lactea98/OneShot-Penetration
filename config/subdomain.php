<?php
    function subdomain($hosts){
        $result = createDirectory();
        
        if($result["type"] == "fail"){
            return $result;
        }
        $directory_name = $result["directoryName"];
        
        // Execute asssetfinder to get subdomain
        chdir($_SERVER["DOCUMENT_ROOT"] . "/result/".$directory_name . "/");        
        for($count = 0; $count< count($hosts); $count++){
            exec("assetfinder -subs-only ". escapeshellarg($hosts[$count]) ." >> domain");
        }
        // Remove duplicate host
        exec("sort domain | uniq > domains");
        exec("rm domain");
        exec("cat domains", $output);
        
        // // Execute httprobe to get http/https list
        // exec("cat domains | httprobe | tee hosts");
        // exec("cat hosts", $output);
        
        return ["type" => "success", "subdomain" => $output, "directoryName" => $directory_name];
    }
?>