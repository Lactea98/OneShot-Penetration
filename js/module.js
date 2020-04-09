// https://joshua1988.github.io/web-development/javascript/promise-for-beginners/

///////////////////////////////////////////////////
// Parameter: Array()
// Example: hosts = ["test.com", "http://test2.com"]
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
            loadingFadeOut(".loading");
            
            if(res["type"] == "success"){
                var createTh = `<th scope="col" class="custom-header">Sub-domain</th>`;
                $(".table-hover > thead > tr").append(createTh);
                
                for(var count=0; count<res["subdomain"].length; count++){
                    var html = `<tr id="{$host-id}">
                    <th scope="row">{$count}</th>
                    <td class="result-host">{$host}</td>
                    </tr>`;
                    html = html.replace(/\{\$host-id\}/, res["subdomain"][count].replace(/\./g, "-"));
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
///////////////////////////////////////////////////


function s3(sub){
    
}


///////////////////////////////////////////////////
// Parameter: Array()
// Example: hosts = ["1.test.com", "https://2.test2.com"]
function smuggling(sub_list){
    var host = '';
    var check = 0;
    
    for(var i = 0; i<sub_list.length; i++){
        host = sub_list[i].replace("http://", "");
        host = host.replace("https://", "");
        
        fetch("./config/config.php",{
            method: "POST",
            body: JSON.stringify({
                hosts: host,
                mode: "smuggling"
            }),
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(function(res){
            if(res["result"] != "undefined"){
                var findHostId = res["host"].replace(/\./g, "-");
                
                if($("#"+findHostId).length != 0){
                    if(check == 0){
                        var createTh = `<th scope="col" class="custom-header">Smuggling</th>`;
                        $(".table-hover > thead > tr").append(createTh);
                        check = 1;
                    }
                    
                    var html = `<td class="result-smuggling">{$host}</td>`;
                    html = html.replace("{$host}", res["result"]);
                    $("#"+findHostId).append(html);
                }
                else{
                    if(check == 0){
                        var createTh = `<th scope="col" class="custom-header">Host</th>
                        <th scope="col" class="custom-header">Smuggling</th>`;
                        $(".table-hover > thead > tr").append(createTh);
                        
                        check = 1;
                    }
                    
                    var html = `<tr>
                    <th scope="row"></th>
                    <td class="host-name">{$host}</td>
                    <td class="result-smuggling">{$result}</td>
                    </tr>`;

                    // html = html.replace("{$count}", i+1);
                    html = html.replace("{$host}", res["host"]);
                    html = html.replace("{$result}", res["result"]);
                    $(".table-hover > tbody").append(html);   
                }   
            }
        })
    }
    // loadingFadeOut(".loading");
}
///////////////////////////////////////////////////



function loadingFadeOut(className){
    $(className).fadeOut();
}