var express = require('express');
var router = express.Router();
var moment = require('moment'); // 追加
var connection = require('../mysqlConnection');

router.get('/:board_id', function(req, res, next) {
  var boardId = req.params.board_id;
  var getBoardQuery = 'SELECT * FROM boards WHERE board_id = ' + boardId;
    var getMessagesQuery = 'SELECT M.message, ifnull(U.user_name, \'名無し\') AS user_name, DATE_FORMAT(M.created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM messages M LEFT OUTER JOIN users U ON M.user_id = U.user_id WHERE M.board_id = ' + boardId + ' ORDER BY M.created_at ASC'; // 変更
    connection.query(getBoardQuery, function(err, board) {
    console.log(board);
    connection.query(getMessagesQuery, [boardId], function(err, messages) {
      console.log(messages);
      try{
        res.render('board', {
          title: board[0].title,
          board: board[0],
          messageList: messages
        });
      }catch(e){
        console.log(e);
      }
    });
  });
});

router.post('/:board_id', function(req, res, next) {
  var message = req.body.message;
  var boardId = req.params.board_id;
  var userId = req.session.user_id? req.session.user_id: 0; // 追加 var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO messages (message, board_id, user_id, created_at) VALUES ("' + message + '", ' + '"' + boardId + '", ' + '"' + userId + '", ' + '"' + createdAt + '")'; // 変更 connection.query(query, function(err, rows) {
    connection.query(query, function(err, rows) {
      if( err ) {
        console.log(err);
        return;
      }
    res.redirect('/boards/' + boardId);
  });
});

module.exports = router;
