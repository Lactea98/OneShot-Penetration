'use strict'

$(document).ready(function(){
    $(".penetration").on("click", function(){
        $(".table-hover > tbody").children().remove();
        
        var regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
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
                subdomain(hosts, checkbox).then(function(subdomain_list){
                    if(checkbox["port"] == true){
                        
                    }
                    if(checkbox["s3"] == true){
                        s3(subdomain_list)
                    }
                    if(checkbox["smuggling"] == true){
                        smuggling(subdomain_list);
                    }
                });
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