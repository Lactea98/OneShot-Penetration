<?php
    function subdomain($hosts){
        // Set filename
        $today = date("Y.m.d");
        $hash = bin2hex(random_bytes(16));
        $directory_name = $today."_".$hash;
        
        // Create directory        
        chdir("../result");
        if (!mkdir($directory_name, 0755, true)) {
            return ["type" => "fail", "message" => "Failed to create folders"];
        }
        
        // Execute asssetfinder to get subdomain
        chdir($_SEVER["DOCUMENT_ROOT"] . "/result/".$directory_name);        
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
        
        return ["type" => "success", "subdomain" => $output];
    }
?>