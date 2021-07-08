var express = require('express');
var router = express.Router();
var sql = require('mssql');

var sqlconn = "mssql://sa:Foxconn88@127.0.0.1:1433/MyBlock";

var strsql = "";
router.get("/", function (req, res, next) {

  console.log(req.query);
  var mode = req.query.mode;
  // res.json({
  //     'status':200,
  //     "data":{
  //         userid:"3"
  //     }
  // })
  if (mode == "Get_content") {
    strsql = "select *,convert(varchar(23),Createdate,120) createtime from  m_Content order by createdate";
  }
  if (mode == "get_typelist") {
    strsql = "select * from m_Type order by typeid";
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
        });//res.send(req.query.mode); // res.send(data.recordset); 
      }).catch(function (err) {
        console.log(err);
      });
  }).catch(function (err) {
    console.log(err);
  });

})

module.exports = router;
