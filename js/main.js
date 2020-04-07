'use strict'

$(document).ready(function(){
    $(".penetration").on("click", function(){
        var hosts = Array();
        var checkbox = {
            "subdomain": $("#subdomain-check").is(":checked"),
            "portscan": $("#portscan-check").is(":checked"),
            "s3scan": $("#s3scan-check").is(":checked"),
            "smuggling": $("#httpsmuggling-check").is(":checked")
        }
        
        $("input[name=hosts]").each(function(index, item){
            hosts.push($(item).val());
        });
        
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
        }).then(res => console.log(res.json()))
    })    
})
