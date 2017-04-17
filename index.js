var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var list = require('./parse.js');

var schools = list('67846', function(list) {
  console.log(list);
});


var createMsg = require('./createMsgFromZip.js');

var accountSid = 'ACf9c87a70f6df3afa949cd02fab0d2b5f'; // Your Account SID from www.twilio.com/console
var authToken = '46f346035b4b588e0bbb6c20be3ca1de';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post("/message", function (request, response) {
  let zip = request.body;
  var msg = createMsg(zip);
  response.send(msg);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.post('/sms', function(request, response) {
  var twiml = new twilio.TwimlResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
