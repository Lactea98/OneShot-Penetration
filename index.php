<!DOCTYPE html>
<html>
    <head>
        <title>OneShot-Penetration</title>
        <meta charset="utf-8">
        <!-- assets -->
        <link rel="stylesheet" href="assets/bootstrap-4.4.1-dist/css/bootstrap.css">
        <script src="assets/jquery-3.4.1.min.js"></script>
        <script src="assets/bootstrap-4.4.1-dist/js/bootstrap.js"></script>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />
        
        <!-- custom -->
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/custom_bootstrap.css">
        <script src="js/custom_bootstrap.js"></script>
        <script src="js/main.js"></script>
        <script src="js/module.js"></script>
    </head>
    <body>
        <div id="main-container">
            <div class="main-title">
        <pre>
 _____             _       _       _____             _           _   _         
|     |___ ___ ___| |_ ___| |_ ___|  _  |___ ___ ___| |_ ___ ___| |_|_|___ ___ 
|  |  |   | -_|_ -|   | . |  _|___|   __| -_|   | -_|  _|  _| .'|  _| | . |   |
|_____|_|_|___|___|_|_|___|_|     |__|  |___|_|_|___|_| |_| |__,|_| |_|___|_|_|

Oneshot-penetration @universe
</pre>
<!--            <pre>-->
<!--  ____                  _           _          _____                _             _   _             -->
<!-- / __ \                | |         | |        |  __ \              | |           | | (_)            -->
<!--| |  | |_ __   ___  ___| |__   ___ | |_ ______| |__) |__ _ __   ___| |_ _ __ __ _| |_ _  ___  _ __  -->
<!--| |  | | '_ \ / _ \/ __| '_ \ / _ \| __|______|  ___/ _ \ '_ \ / _ \ __| '__/ _` | __| |/ _ \| '_ \ -->
<!--| |__| | | | |  __/\__ \ | | | (_) | |_       | |  |  __/ | | |  __/ |_| | | (_| | |_| | (_) | | | |-->
<!-- \____/|_| |_|\___||___/_| |_|\___/ \__|      |_|   \___|_| |_|\___|\__|_|  \__,_|\__|_|\___/|_| |_|-->
<!--            </pre>-->
            </div>
            <div class="main-options">
                <!-- option title -->
                <div class="options-title">
                    <h2>Options</h2>
                </div>
                
                <!-- Input Host name -->
                <div class="form-group">
                    <div class="col-sm-10">
                        <div class="dynamic-wrap">
                            <form role="form" autocomplete="off">
                                <div class="entry input-group">
                                <input hidden="hidden" class="not-enter">
                                <input class="form-control" name="hosts" type="text" placeholder="Input host (You can input multi hosts.)" />
                                <span class="input-group-btn">
                                <button class="btn btn-success btn-add" type="button">
                                    <i class="fas fa-plus"></i>
                                </button>
                              </span>
                            </div>
                          </form>
                        </div>
                    </div>
                </div>
                
                <!-- Detail options -->
                <div class="custom-control custom-checkbox custom-control-inline detail-options">
                    <input type="checkbox" class="custom-control-input" id="subdomain-check">
                    <label class="custom-control-label" for="subdomain-check">Sub-domain scan</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline detail-options">
                    <input type="checkbox" class="custom-control-input" id="portscan-check">
                    <label class="custom-control-label" for="portscan-check">Port scan</label>
                </div>
                <div class="custom-control custom-checkbox custom-control-inline detail-options">
                    <input type="checkbox" class="custom-control-input" id="s3scan-check">
                    <label class="custom-control-label" for="s3scan-check">s3 scan</label>
                </div>
                <div class="custom-control custom-checkbox detail-options">
                    <input type="checkbox" class="custom-control-input" id="httpsmuggling-check">
                    <label class="custom-control-label" for="httpsmuggling-check">HTTP request smuggling scan</label>
                </div>
                <button type="button" class="btn btn-success penetration">Start Penetration</button>
            </div>
            <div class="main-result" id="reports">
                <div class="result-title">
                    <a href="#reports"><h2>Reports</h2></a>
                </div>
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 100px;">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </table>
            </div>
            <div id="footer">
                Made by universe
            </div>
        </div>
    </body>
</html>