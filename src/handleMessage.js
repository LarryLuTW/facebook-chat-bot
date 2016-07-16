var db = require('./db');

var responseMap = db.getResponseMap();
var questionArr = db.getQuestionArr();

function getQuestionList(){
    var res = 'You can say';
    questionArr.forEach(function(question, index){
        res += '\n' + (index + 1).toString() + '.' + question;
    });
    return res;
}

function getRes(req){
    var resKey = null;
    var keys = Object.keys(responseMap);
    for(var i=0 ; i<keys.length ; i++){
        var key = keys[i];
        var regex = new RegExp(key);
        if(req.match(regex)){
            resKey = key;
            break;
        }
    }
    if(resKey){
        return responseMap[resKey];
    } else {
        return null;
    }
}

function handleMessage(req, id, sendMessage){
    var response = getRes(req);
    if(!response) response = getQuestionList();

    sendMessage(response, id).then(() => {
        console.log('respond to \"' + req + '\" success');
        console.log(response);
    }).catch(err => {
        console.log(err);
    });
}


module.exports = handleMessage;
