
//services
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const classifier = require('./nlu/classifier.js');


// models
const Reply = require('./reply.js');


// socket.io channels 
const messageChannel = 'message';
const replyChannel = 'reply';

app.use('/', express.static(path.join(__dirname + '/public')));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  console.log("User connected to Chatbot");
  //socket.emit(replyChannel, new Reply("init", JSON.parse('{"name": "init1"}'), "").toJson());
  
  
  //jsonobj.message[0]={recipient_id: 'default', text: 'Init'}.toJson();
  //socket.emit(replyChannel,jsonobj);
  socket.emit(replyChannel,"Init Message");
  socket.on(messageChannel, function (message, isUser, fn) {
      console.log("MSG CAME: "+message);
      fn('Message arrived to the server'); //callback function
      sendToBot(message, socket);
      
  });

  socket.on(replyChannel, function(message, intent, feedback){
    var feedbackLog="Message: " + message +" | Feedback: " + feedback;
    var currTime=new Date();
    feedbackLog="INFO: "+currTime+" : "+feedbackLog+"\n";
    var fs=require('fs');
    fs.appendFile('FeedbackLog.txt',feedbackLog,function(err){
      if(err) throw err;
      console.log(feedbackLog);
    })
    //console.log(feedbackLog);
  });
});

var port = 8100;
server.listen(port, function () {
  console.log('Chatbot is listening on port ' + port + '!')
});

sendToBot = function(message, socket){
  classifier.parse(message, function (error,success) {
    console.log(message);
    if (error) {
      socket.emit(replyChannel, "An error has occurred: " + error);
    } else {
    
     console.log("ReplyChannel: Success====>"+success);
     var rep=new Reply(success).toJson();
     
      socket.emit(replyChannel, rep);
    }
  });
}
