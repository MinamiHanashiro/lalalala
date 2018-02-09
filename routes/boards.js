var express = require('express');
var router = express.Router();
var moment = require('moment'); // 追加
var connection = require('../mysqlConnection');

router.get('/:board_id', function(req, res, next) {
  var boardId = req.params.board_id;
  var getBoardQuery = 'SELECT * FROM boards WHERE board_id=?';
  var getMessagesQuery = 'SELECT *, DATE_FORMAT(created_at, \'%Y年%m月%d日 %k時%i分%s秒\') AS created_at FROM messages WHERE board_id=?';
  connection.query(getBoardQuery, [boardId], function(err, board) {
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
  var createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
  var query = 'INSERT INTO messages (message, board_id, created_at) VALUES (?, ?, ?)';
  connection.query(query, [message, boardId, createdAt], function(err, rows) {
    res.redirect('/boards/' + boardId);
  });
});

module.exports = router;
