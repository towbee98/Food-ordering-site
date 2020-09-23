var mysql = require('ibm_db');
global.dbConnString = "DATABASE=dash019199;"
    + "HOSTNAME=bluemix05.bluforcloud.com;PORT=50000;PROTOCOL=TCPIP;"
    + "UID=dash019199;PWD=lTR3LQiHdKl5";


    mysql.open(dbConnString, function(err, connection) {
        if (err) {
            console.log("Error", err);
        } else {
        
         module.exports = connection;   
         console.log("Successfully created the connection to DashDB in the cloud"); 
        }
    })












