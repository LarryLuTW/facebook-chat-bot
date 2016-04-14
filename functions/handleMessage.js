var chalk = require('chalk');
var respond = require('./respond');
var question = require('./question');
var sys = require('./sys');

var handleResponseError = function(err, res, msgInfo){
    if(err) console.log('response error');
    else console.log(chalk.cyan('bot send message: ') + res);
}

var sendQuestion = function(api, message){
    api.sendMessage('You can say', message.threadID, function(err, msgInfo){
        handleResponseError(err, 'You can say', msgInfo);
    });
    question.forEachQuestion(function(q, asyncCallback){
        api.sendMessage(q, message.threadID, function(err, msgInfo){
            handleResponseError(err, q, msgInfo);
            asyncCallback(err, null);
        });
    });
}

var handleSysRes = function(req, api, message, stop){
    sys.sysRespond(req, api, message.threadID, stop);
}

var handleRegRes = function(req, api, message){
    respond.getResponse(req, function(res){

        if(res){

            api.sendMessage(res, message.threadID, function(err, msgInfo){
                handleResponseError(err, res, msgInfo);   
            });

        } else {
            
            sendQuestion(api, message);

        }

    });
}

module.exports = function(api, message, stop){

    var req = message.body ? message.body.toLowerCase() : "";
    if(req){

        console.log(chalk.red('bot receive message: ') + message.body);

        if(req.charAt(0) === '/'){

            handleSysRes(req, api, message, stop);

        } else {

            handleRegRes(req, api, message);

        }
    }
};

