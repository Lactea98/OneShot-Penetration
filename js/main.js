'use strict'

$(document).ready(function(){
    $(".penetration").on("click", function(){
        $(".table-hover > tbody").children().remove();
        $(".custom-header").remove();
        
        // Define
        var regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
        var hosts = Array();
        var checkbox = {
            "subdomain": $("#subdomain-check").is(":checked"),
            "port": $("#portscan-check").is(":checked"),
            "s3": $("#s3scan-check").is(":checked"),
            "smuggling": $("#httpsmuggling-check").is(":checked")
        }
        var result = Array();
        var check = 0;
        
        // Check host regex
        $("input[name=hosts]").each(function(index, item){
            if (regex.test($(item).val())){
                var result = $(item).val().replace("http://", "");
                result = result.replace("https://", "");
                
                hosts.push(result);
            }
            else{
                check += 1;
                return;
            }
        });
        
        // check option
        if(!(checkbox["subdomain"] || checkbox["port"] || checkbox["s3"] || checkbox["smuggling"])){
            check += 2;
        }
        
        // Print result
        if(check == 0){
            $(".main-result").fadeIn();
            // https://loading.io/
            $(".main-result").append("<center><img class='loading' src='./images/loading.svg'></center>");
            
            if(checkbox["subdomain"] == true){
                subdomain(hosts).then(function(subdomain_list){
                    if(checkbox["port"] == true){
                        
                    }
                    if(checkbox["s3"] == true){
                        s3(subdomain_list, $(".directory_name").val());   
                    }
                    if(checkbox["smuggling"] == true){
                        smuggling(subdomain_list);
                    }
                });
            }
            else{
                if(checkbox["smuggling"] == true){
                    smuggling(hosts);
                }
                if(checkbox["s3"] == true){
                    var directoryName = $(".directory_name").val();
                    
                    // If not setting directory name
                    if(directoryName == null){
                        createDirectory().then(function(res){
                            if(res["type"] == "success"){
                                s3(hosts, res["directoryName"]);
                            }
                            else{
                                alert(res["message"]);
                            }
                        });
                    }
                    else{
                        s3(hosts, directoryName);                            
                    }
                }   
            }
        }
        
        // Error
        else if(check == 1){
            $("input[name=hosts]").css("background-color", "#ff3c3c");
            $("input[name=hosts]").css("color", "white");
            $("input[name=hosts]").val("Invalid hosts.");
            
            setTimeout(function(){
                $("input[name=hosts]").css("background-color", "white");
                $("input[name=hosts]").css("color", "black");
                $("input[name=hosts]").val("");
            },1000)
        }
        // Error
        else if(check >= 2){
            $(".custom-control-label").css("color", "red");
            setTimeout(function(){
                $(".custom-control-label").css("color", "white");
            },1000)
        }
    })    
})


function createDirectory(){
    var directoryName = '';
    
    return new Promise(function(resolve, reject){
        fetch("./config/config.php", {
            method: "POST",
            body: JSON.stringify({
                mode: "createDirectory"
            }),
            credentials: "same-origin",
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(function(res){
            resolve(res);
        })
    })
}