var fs = require('fs');
var path = require('path');

var databaseDir = path.resolve(__dirname + '/../database/');

function getResponseMap(){
    var data = fs.readFileSync(databaseDir + '/respond.json', 'utf8');
    try {
        var responseMap = JSON.parse(data);
        return responseMap;
    } catch(err){
        console.log(err);
    }
}

function getQuestionArr(){
    var data = fs.readFileSync(databaseDir + '/question.json', 'utf8');
    try {
        var json = JSON.parse(data);
        return json;
    } catch(err){
        console.log(err);
    }
}

module.exports.getResponseMap = getResponseMap;
module.exports.getQuestionArr = getQuestionArr;

