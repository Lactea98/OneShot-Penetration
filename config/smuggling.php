<?php 
    function smuggling($host){
        $cmd = escapeshellcmd("python3 " . $_SERVER["DOCUMENT_ROOT"] . "/assets/smuggler/smuggler.py --url " . $host . " --agent");
        $output = shell_exec($cmd);
        // system("python3 " . $_SEVER["DOCUMENT_ROOT"] . "/assets/smuggler/smuggler.py --url ".escapeshellarg($url) . "--agent", $output);
        return ["type" => "success", "result" => $output, "host" => $host];
    }
    
?>