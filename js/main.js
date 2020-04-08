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
        
        if(check == 0){
            $(".main-result").fadeIn();
            
            fetch("./config/config.php", {
                method: "POST",
                body: JSON.stringify({
                    hosts: hosts,
                    checkbox: checkbox
                }),
                credentials: "same-origin",
                headers:{
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(function(res){
                for(var count=0; count<res["subdomain"].length; count++){
                    var html = `<tr>
                    <th scope="row">{$count}</th>
                    <td class="result-host">{$host}</td>
                    <td class="result-port"></td>
                    <td class="result-vuln"></td>
                    </tr>`;
                    html = html.replace("{$count}", count+1);
                    html = html.replace("{$host}", res["subdomain"][count]);
                    $(".table-hover > tbody").append(html);   
                }
                document.getElementById('reports').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
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
        else if(check >= 2){
            $(".custom-control-label").css("color", "red");
            setTimeout(function(){
                $(".custom-control-label").css("color", "white");
            },1000)
        }
    })    
})
