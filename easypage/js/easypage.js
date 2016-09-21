
function ajaxJSONPost(jsondata, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/sendmail");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
       if (xhr.readyState == 4 && xhr.status == 200) {
           callback(undefined, xhr.responseText);
       }
       else if(xhr.readyState == 4 && xhr.status != 200) {
           callback('Error ' + xhr.status);
       }
    }
    xhr.send(JSON.stringify(jsondata));
}

function sendMail(subject, message, callback) {
   ajaxJSONPost({
       subject: subject,
       message: message
   }, callback);
}

var easypage = {
    send: sendMail
}
