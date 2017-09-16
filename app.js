var Connection = require('tedious').Connection;  
var config = {  
    userName: 'sa',  
    password: 'abc@123',  
    server: '10.2.109.63',  
    // If you are on Microsoft Azure, you need this:  
    //options: {encrypt: true, database: 'AdveniviewwcmtureWorks'}  
    database : "iviewwcm"
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
// If no error, then good to proceed.  
    console.log("Connected");  
    executeStatement();  
});  

var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;  

function executeStatement() {  
    request = new Request("SELECT * from WIDGETKIND where Name ='cardout'", function(err, rowCount) {  
    if (err) {  
        console.log(err);
    }  
        console.log("rowcount " + rowCount);
    }); 
    
    var result = "";  
    var i=0;
    request.on('row', function(columns) {  
        columns.forEach(function(column) {  
          if (column.value === null) {  
            console.log('NULL');  
          } else {  
            //if(column.metadata.colName == "Name")
                console.log(column.metadata.colName + " : " + column.value);
          }  
        });  
        //console.log(result);  
        result ="";  
    });  

    request.on('done', function(rowCount, more) {  
    console.log(rowCount + ' rows returned');  
    });  
    connection.execSql(request);  
}  