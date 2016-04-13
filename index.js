var login = require('./functions/login');
var handleMessage = require('./functions/handleMessage.js');

var userInfo = {
    email: 'Your_Email@test.com',
    password: 'Your_Password'
};

login(userInfo, handleMessage);
