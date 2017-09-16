const sql = require('mssql')


const express = require('express')
const app = express()

app.get('/', function (req, res) {
    //res.send('Hello World!')

    new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query("select * from WidgetKind")
        }).then(result => {
          let rows = result.recordset
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.status(200).json(rows);
          sql.close();
        }).catch(err => {
          res.status(500).send({ message: "${err}"})
          sql.close();
        });
      });
      


    // sql.connect(config).then(() => {
    //     return sql.query`select * from WidgetKind`
    // }).then(result => {
    //     console.dir(result)
    //     res.send(result);
    // }).catch(err => {
    //     // ... error checks
    //     console.log(err);
    // })

    // sql.on('error', err => {
    //     console.log("error");
    //     sql.close();
    //     // ... error handler
    // })

// })

app.listen(3999, function () {
    console.log('Example app listening on port 3999!')
})

const config = {
    user: 'sa',
    password: 'abc@123',
    server: '10.2.109.63', // You can use 'localhost\\instance' to connect to named instance
    database: 'iviewwcm'

    // options: {
    //     encrypt: true // Use this if you're on Windows Azure
    // }
}

// sql.connect(config).then(() => {
//     return sql.query`select * from WidgetKind`
// }).then(result => {
//     console.dir(result)
// }).catch(err => {
//     // ... error checks
//     console.log(err);
// })

// sql.on('error', err => {
//     console.log("error");
//     // ... error handler
// })