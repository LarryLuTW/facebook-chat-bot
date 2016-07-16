var login = require('facebook-chat-api');
var handleMessage = require('./src/handleMessage.js');

var userInfo = {
    email: 'Your_Email@test.com',
    password: 'Your_Password'
};

login({email: userInfo.email, password: userInfo.password}, function(err, api){
    if(err) return console.log(err);

    function sendMessage(str, id){
        return new Promise((resolve, reject) => {
            api.sendMessage(str, id, function(err){
                if(err){
                    reject(err);
                    return;
                }
                resolve('send str success');
            });
        });
    }

    api.listen(function(err, message){
        if(err){
            console.log(err);
            return;
        }

        var req = message.body ? message.body.toLowerCase() : ''; 
        var id = message.threadID;
        if(req) handleMessage(req, id, sendMessage);
    });

});

