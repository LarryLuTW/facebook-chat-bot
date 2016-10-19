var login = require('facebook-chat-api');
var handleMessage = require('./src/handleMessage.js');

var userInfo = {
    email: 'Your_Email@test.com',
    password: 'Your_Password'
};

var timeout = undefined; // 1000 for one second

var inTimeout = {};

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

        console.log(message);

        var req = message.body ? message.body.toLowerCase() : ''; 
        var id = message.threadID;
        if(req && !inTimeout[id]){
            handleMessage(req, id, sendMessage);
            if(timeout){
                inTimeout[id] = true;
                setTimeout(function(){
                    inTimeout[id] = false;
                }, timeout);
            }
        }
    });

});

