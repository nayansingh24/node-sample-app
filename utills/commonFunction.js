var md5                                       = require('md5');

exports.generateAcceeToken                    = generateAccessToken;

function generateAccessToken(email,password) {
    var secretKey = md5(""+email+password+new Date());
    return secretKey;
}
