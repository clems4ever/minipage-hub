
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var Q = require('q');


module.exports = function(username) {
    // listen for token updates (if refreshToken is set)
    // you probably want to store these to a db
    generator.on('token', function(token){
        console.log('New token for %s: %s', token.user, token.accessToken);
    });

    // login
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            xoauth2: xoauth2.createXOAuth2Generator({
                user: username,
                clientId: '{Client ID}',
                clientSecret: '{Client Secret}',
                refreshToken: '{refresh-token}',
                accessToken: '{cached access token}'
            })
        }
    });

    return function(from, to, subject, message) {
        var defer = Q.defer();
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: from, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            html: message // plaintext body
        };
        
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                defer.reject(error);
                return;
            }
            defer.resolve(info.response);
        });
        return defer.promise;
    }
}
