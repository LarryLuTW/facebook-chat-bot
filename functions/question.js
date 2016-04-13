var npmlog = require('npmlog');
var async = require('async');
var db = require('./db');

npmlog.info("init question");




npmlog.info("init question", "OK");



var forEachQuestion = function(callback){
    var seriesArr = [];
    var questions = [];
    var index = 0;
    db.getQuestionArr(function(questionArr){
        for(var i=0 ; i<questionArr.length ; i++){
            var n = (i+1).toString() + '.';
            var question = n + questionArr[i];

            questions.push(question);
            seriesArr.push(function(asyncCallback){
                callback(questions[index], asyncCallback);
                index++;
            });
        }
        async.series(seriesArr);
    });
};

module.exports.forEachQuestion = forEachQuestion;


