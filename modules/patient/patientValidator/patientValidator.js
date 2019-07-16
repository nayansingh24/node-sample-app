const Joi                                        = require('joi');
const apiReferenceModule                         = "Patient";
const validator                                  = require('./../../../validator/validator');

exports.patientCreate                            = patientCreate;
exports.patientDetails                           = patientDetails;
exports.patientEdit                              = patientEdit;
exports.patientRemove                            = patientRemove;

function patientCreate(req, res, next) {
    req.apiReference = {
        module: apiReferenceModule,
        api: "patientCreate"
    };
    let schema = {
        name: Joi.string().required(),
        age: Joi.number().required().min(0),
        gender: Joi.string().required(),
        blood_group: Joi.string().optional(),
        email: Joi.string().email().required(),
        phone: Joi.number().required(),
        height: Joi.number().optional(),
        bmi: Joi.number().optional(),
        address: Joi.string().optional(),
        // is_active: is_active,
        // is_blocked: is_blocked,
        // is_deleted: is_deleted,
        password: Joi.string().min(7).required(),
        dob: Joi.string().optional()
    }
    let isValid = validator.validateFields(apiReference, req, res, schema);
    if(isValid)
        next();
}
function patientDetails() {

}
function patientEdit() {

}
function patientRemove() {

}
