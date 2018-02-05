var express = require('express');
var router = express.Router();
var moment = require('moment'); // 追加

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  var title = req.body.title;
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss'); // 追加
  console.log(title);
  console.log(createdAt); // 追加
});

module.exports = router;
