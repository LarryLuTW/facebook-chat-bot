var npmlog = require('npmlog');
var fs = require('fs');

npmlog.info('init db');


npmlog.info('init db', 'OK');



var getResponseMap = function(callback){
    fs.readFile('./database/respond.json', 'utf8', function(err, data){
        if (err) throw err;
        var responseMap = JSON.parse(data);
        callback(responseMap);
    });
}

var getQuestionArr = function(callback){
    fs.readFile('./database/question.json', 'utf8', function(err, data){
        if (err) throw err;
        var json = JSON.parse(data);
        var questionArr = json.arr;
        callback(questionArr);
    });
}

module.exports.getResponseMap = getResponseMap;
module.exports.getQuestionArr = getQuestionArr;


