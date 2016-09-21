var mailgun = require('mailgun-js');
var Q = require('q');

function sendMailWithMailgun(domain, api_key) {
    return function(from, to, subject, message) {
        var defer = Q.defer();
        var data = {
          from: from,
          to: to,
          subject: subject,
          text: message
        };

        var mg = mailgun({apiKey: api_key, domain: domain});
        mg.messages().send(data, function(error, body) {
            if(error) {
                defer.reject(error);
            }
            else {
                defer.resolve(body);
            }
        });
        return defer.promise;
    }
}


module.exports = function(domain, api_key) {
    return sendMailWithMailgun(domain, api_key);
}
