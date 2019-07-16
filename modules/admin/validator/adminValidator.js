const joi                                 = require('joi');
const apiReference                        = "adminVallidator";

exports.adminLogin                        = adminLogin;

function adminLogin(req, res) {
    let schema = {
        email : joi.string().required(),
        password : joi.string.required(),
    }

}
