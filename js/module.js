// https://joshua1988.github.io/web-development/javascript/promise-for-beginners/
function subdomain(hosts){
    return new Promise(function(resolve, reject){
        fetch("./config/config.php", {
            method: "POST",
            body: JSON.stringify({
                hosts: hosts,
                mode: "subdomain" 
            }),
            credentials: "same-origin",
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(function(res){
            $(".loading").fadeOut();
            
            if(res["type"] == "success"){
                for(var count=0; count<res["subdomain"].length; count++){
                    var html = `<tr id="{$host}">
                    <th scope="row">{$count}</th>
                    <td class="result-host">{$host}</td>
                    </tr>`;
                    html = html.replace("{$count}", count+1);
                    html = html.replace(/\{\$host\}/g, res["subdomain"][count]);
                    $(".table-hover > tbody").append(html);   
                }
                document.getElementById('reports').scrollIntoView({
                    behavior: 'smooth'
                });
                resolve(res["subdomain"]);   
            }
            else{
                var html = `<font class='error-report' color='red'>Error</font>`;
                $(".table-hover").append(html);
                
                setTimeout(function(){
                    $(".error-report").remove();
                }, 2000);
            }
        });
    })
}


function s3(sub){
    
}

function smuggling(sub_list){
    fetch("./config/smuggling.php",{
        method: "POST",
        body: JSON.stringify({
            hosts: sub_list,
            mode: "smuggling"
        }),
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
    .then(function(res){
        
    })
}