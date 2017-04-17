var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var createMsg = require('./createMsgFromZip.js');

var accountSid = 'AC87b63e9e453fc85755fa9a7271117763'; // Your Account SID from www.twilio.com/console
var authToken = '510cd92cc4d94598f4f2ded16b1f282f';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.post('/sms', function(request, response) {
  var zip = request.body.Body;
  var msg = createMsg(zip);
  var twiml = new twilio.TwimlResponse();
  twiml.message(msg);
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
// TEST CASES
// let zip = '91108';
// let msg = createMsg(zip);
// console.log(zip);
// console.log(msg);
// zip = '82642'
// msg = createMsg(zip);
// console.log(zip);
// console.log(msg);
