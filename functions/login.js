var login = require('facebook-chat-api');

var larryID = 100001567752835;

module.exports = function(userInfo, handleMessage){
    login({ email: userInfo.email, password: userInfo.password }, function(err, api){

        if(err) return console.error(err);
        api.sendMessage("布丁狗起床了~", larryID, function(err, msgInfo){
            if(err) console.log('first message error')
        });

        var stop = api.listen(function(err, message){
            if(err) return console.error(err);
            else handleMessage(api, message, stop);
        });

    });
};

