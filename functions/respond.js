var npmlog = require('npmlog');
var db = require('./db');

npmlog.info("init respond");




npmlog.info("init respond", "OK");



var getResponse = function(req, callback){
    db.getResponseMap(function(responseMap){

        var hasReturned = false;
        for(var keyword in responseMap){
            var pattern = new RegExp('.*' + keyword + '.*');
            if(pattern.test(req)){
                callback(responseMap[keyword]);
                hasReturned = true;
                break;
            }
        }
        var noRes = '';
        if(!hasReturned) callback(noRes);

    });
};

module.exports.getResponse = getResponse;

