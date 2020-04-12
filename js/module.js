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
                var createTh = `<th scope="col" class="custom-header">Sub-domain</th>
                <input type='hidden' class="directory-name" value={}>`;
                createTh = createTh.replace("{}", res["directoryName"]);
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



///////////////////////////////////////////////////
// Parameter: Array(), string
// Example: sub_list       = ["test.com", "1.test.com", "http://test.com"]
//          directory_name = "{y.m.d}_{randomHash}"
function s3(sub_list, directory_name){
    var host = '';
    var check = 0;
    
    for(var i = 0; i<sub_list.length; i++){
        host = sub_list[i].replace("http://", "");
        host = host.replace("https://", "");
        
        fetch("./config/config.php", {
            method: "POST",
            body: JSON.stringify({
                hosts: host,
                directoryName: directory_name,
                mode: "s3"
            }),
            credentials: "same-origin",
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(function(res){
            if(res["type"] == "success"){
                var hostId = res["host"].replace(/\./g, "-");
                var resultBuckets = '';
                
                for(var a=0; a<res["buckets"].length; a++){
                    resultBuckets += res["buckets"][a] + "<br>";
                }
                
                if($("#" + hostId).length != 0){
                    if(check == 0){
                        var createTh = `<th scope="col" class="custom-header">S3</th>`
                        $(".table-hover > thead > tr").append(createTh);
                        check = 1;
                    }
                    var html = `<td class="result-s3">{$host}</td>`;
                    html = html.replace("{$host}", resultBuckets);
                    $("#" + hostId).append(html);
                    loadingFadeOut(".loading");
                }
                else{
                    if(check == 0){
                        var createTh = `<th scope="col" class="custom-header">Host</th>
                        <th scope="col" class="custom-header">S3</th>`;
                        $(".table-hover > thead > tr").append(createTh);
                        
                        check = 1;
                    }
                    
                    var html = `<tr>
                    <th scope="row"></th>
                    <td class="host-name">{$host}</td>
                    <td class="result-s3">{$result}</td>
                    </tr>`;

                    // html = html.replace("{$count}", i+1);
                    html = html.replace("{$host}", host);
                    html = html.replace("{$result}", resultBuckets);
                    $(".table-hover > tbody").append(html); 
                    loadingFadeOut(".loading");
                }
            }
        })
    }
}


///////////////////////////////////////////////////
// Parameter: Array()
// Example: sub_list = ["1.test.com", "https://2.test2.com"]
// Return: Not return value, but print result.
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
            if(res["type"] == "success"){
                var hostId = res["host"].replace(/\./g, "-");
                
                if($("#" + hostId).length != 0){
                    if(check == 0){
                        var createTh = `<th scope="col" class="custom-header">Smuggling</th>`;
                        $(".table-hover > thead > tr").append(createTh);
                        check = 1;
                    }
                    
                    var html = `<td class="result-smuggling">{$host}</td>`;
                    html = html.replace("{$host}", res["result"]);
                    $("#" + hostId).append(html);
                    loadingFadeOut(".loading");
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
                    loadingFadeOut(".loading");
                }   
            }
        })
    }
}
///////////////////////////////////////////////////



function loadingFadeOut(className){
    $(className).fadeOut();
}

function findHostId(id){
    id = "#" + id.replace(/\./g, "-");
    return $(id);
}