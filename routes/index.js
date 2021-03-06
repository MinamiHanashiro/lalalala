var express = require('express');
var router = express.Router();
var moment = require('moment');
var connection = require('../mysqlConnection'); // 追加

/* GET home page. */
router.get('/', function(req, res, next) {
  var query = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM boards';
  connection.query(query, function(err, rows) {
    // 忘れるな
    if( err ) {
      console.log(err);
      return;
    }
    try{
      res.render('index', {
        title: 'はじめてのNode.js',
        boardList: rows
      });
    } catch(e){
      console.log(e);
    }
  });
});



router.post('/', function(req, res, next) {
  var title = req.body.title;
  var userId = req.session.user_id? req.session.user_id: 0; // 追加
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO boards (title, created_at) VALUES (?, ?)';
  connection.query(query, [title, createdAt], function(err, rows) {
    // 忘れるな
    if( err ) {
      console.log(err);
      return;
    }
    res.redirect('/');
    res.end();
  });
});

module.exports = router;
