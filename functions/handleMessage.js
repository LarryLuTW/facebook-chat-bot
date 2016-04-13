var respond = require('./respond');
var question = require('./question');
var sys = require('./sys');

var handleResponseError = function(err, msgInfo){
    if(err) console.log('response error');
}

var sendQuestion = function(api, message){
    api.sendMessage('You can say', message.threadID, handleResponseError);
    question.forEachQuestion(function(q, asyncCallback){
        api.sendMessage(q, message.threadID, function(err, msgInfo){
            handleResponseError(err, msgInfo);
            asyncCallback(null, null);
        });
    });
}

var handleSysRes = function(req, api, message, stop){
    sys.sysRespond(req, api, message.threadID, stop);
}

var handleRegRes = function(req, api, message){
    respond.getResponse(req, function(res){

        if(res){

            api.sendMessage(res, message.threadID, handleResponseError);

        } else {
            
            sendQuestion(api, message);

        }

    });
}

module.exports = function(api, message, stop){

    var req = message.body ? message.body.toLowerCase() : "";
    if(req){
        if(req.charAt(0) === '/'){

            handleSysRes(req, api, message, stop);

        } else {

            handleRegRes(req, api, message);

        }
    }
};

