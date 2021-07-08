var express = require('express');
var router = express.Router();
var sql = require('mssql');

var sqlconn = "mssql://sa:Foxconn88@127.0.0.1:1433/MyBlock";

var strsql = "";
router.get("/", function (req, res, next) {

    console.log(req.query);//console.log(req.params)
    var mode = req.query.mode;
    var io = req.query;

    if (mode == "handle_update") {
        console.log(io);
        console.log(strsql); 
        strsql = "update m_Content set type='" + io.type + "' ,question='" + io.question + "',answer='" + io.answer + "' where id='" + io.id + "'";
    
    }


    sql.connect(sqlconn).then(function () {
        new sql.Request()
            //   .input('userid', req.params.userid)
            //   .input('pwd', req.params.pwd)
            .query(strsql)
            .then(function (data) {
                res.json({
                    status: "200",
                    msg: "",
                    data: data.recordset
                });
             // res.send(data.recordset); 
            }).catch(function (err) {
                console.log(err);
            });
    }).catch(function (err) {
        console.log(err);
    });

})

module.exports = router;
