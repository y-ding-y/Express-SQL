var express = require('express');
var router = express.Router();
var sql = require('mssql');

var strsql = 'mssql://sa:Foxconn88@127.0.0.1:1433/chap';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/User/:mode?/:userid?/:userpwd?', function (req, res, next) {
  console.log(req.params);
  res.json({
    'status': 200,
    'data': {
      "userid": "1"
    }
  })
})

// router.get('/GetInfo/:params/:mode', function (req, res, next) {
//   console.log(req.params);
//   res.json({
//     'status': 200,
//     'data': {
//       res: "GetInfo"
//     }
//   })
// })


router.get('/SearchInfo/', function (req, res, next) {
  console.log(req.query);
  var model=req.query;
  console.log(req.params);
  res.json({
    'status': 200,
    'data': {
      res: "SearchInfo",
      userid:model.userid,
      username:"username",
      roleid:"admin"
    }
  })
})


router.get('/te/:mode2?/:userid?/:pwd?/:mode?', function (req, res) {
  sql.connect(strsql).then(function () {
    new sql.Request()
      .input('userid', req.params.userid)
      .input('pwd', req.params.pwd)
      .query("select * from [SMT_SFC].[dbo].[SFC_USER] where userid=@userid and userpassword=@pwd").then(function (data) {
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
});

module.exports = router;
