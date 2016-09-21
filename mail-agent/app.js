var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Q = require('q');

var PORT = process.env.PORT || 3000;

var MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
var MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;

var GMAIL_USERNAME = process.env.GMAIL_USERNAME;

var EMAIL_FROM = process.env.EMAIL_FROM;
var EMAIL_TO = process.env.EMAIL_TO;


function sendEmail() {
    var send;
    if(GMAIL_USERNAME) {
        console.log('Gmail transporter selected');
        send = require('./lib/gmail')(GMAIL_USERNAME);
    }
    else if(MAILGUN_API_KEY && MAILGUN_DOMAIN) {
        console.log('Mailgun transporter selected');
        send = require('./lib/mailgun')(MAILGUN_DOMAIN, MAILGUN_API_KEY);
    }
    else {
        console.error('No transporter selected');
        process.exit(1);
    }

    return function(req, res) {
        var subject = req.body.subject;
        var message = req.body.message;

        send(EMAIL_FROM, EMAIL_TO, subject, message)
        .then(function() {
            console.log('Mail sent successfully to %s.', EMAIL_TO);
            res.sendStatus(200);
        })
        .fail(function(err) {
            console.trace('Mail not sent.', err);
            res.sendStatus(500);
        });
    };
}

app.use(bodyParser.json());

app.post('/', sendEmail());
app.listen(PORT, function() {
    console.log('Mail agent is listening on port %d', PORT);
});
