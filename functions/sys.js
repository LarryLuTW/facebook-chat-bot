var npmlog = require('npmlog');
npmlog.info('init sys');


npmlog.info('init sys', 'OK');


var getFriendsList = function(api, id, stop){
	api.getFriendsList(function(err, data){
		if(err) return console.log(err);
		var i = 0;
		var str = '我的朋友現在有' + data.length + '個';
		data.forEach(function(person){
			i++;
			str += '\n' + i.toString() + '.' + person.fullName;
		});
        api.sendMessage(str, id, function(err, msgInfo){
            if(err) console.log(err);
        });
	});
};


var stopProcess = function(api, id, stop){
    api.sendMessage('Bye Bye ~', id, function(err, msgInfo){
        process.exit(0);
        //return stop();
    });
}


var sysFun = {};
sysFun['/friend'] = getFriendsList;
sysFun['/stop'] = stopProcess;


var sysRespond = function(req, api, id, stop){
    var fun = sysFun[req];
    if(!fun) return;
    fun(api, id, stop);
}


module.exports.sysRespond = sysRespond;


