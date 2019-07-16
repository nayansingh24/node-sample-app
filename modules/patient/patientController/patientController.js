const Promise                                    = require('bluebird');
const _                                          = require('underscore');

const constants                                  = require('./../../../utills/constant');
const commonFunction                             = require('./../../../utills/commonFunction');
const mongoService                               = require('./../../../services/mongoService');
const responses                                  = require('./../../../utills/response');

exports.patientCreate                            = patientCreate;
exports.patientDetails                           = patientDetails;
exports.patientEdit                              = patientEdit;
exports.patientRemove                            = patientRemove;

function patientCreate(req, res) {
    Promise.coroutine(function *() {
        let age                                       = req.body.age;
        let gender                                    = req.body.gender;
        let blood_group                               = req.body.blood_group;
        let email                                     = req.body.email;
        let phone                                     = req.body.phone;
        let height                                    = req.body.height;
        let bmi                                       = req.body.bmi;
        let address                                   = req.body.address;
        let creation_datetime                         = new Date();
        let updation_datetime                         = new Date();
        let is_active                                 = constants.userActiveStatus.INACTIVE;
        let is_blocked                                = constants.userBlockedStatus.UNBLOCKED;
        let is_deleted                                = constants.userDeletedStatus.NOTDELETED;
        let password                                  = req.body.password;
        let dob                                       = req.body.dob;
        let accessToken;
        accessToken = commonFunction.generateAcceeToken(email, password);
        let isEmailExistOpts = {
            collectionName : "users",
            findObj : {
                "email" : email,
                "password" : password
            }
        };
        let isEmailExist = yield mongoService.mongoFind(req.apiReference, isEmailExistOpts);
        if(_.isEmpty(isEmailExist)){
            return responses.sendResponse(res,constants.responseMessage.EMAIL_ALREADY_EXIST,constants.responseFlags.EMAIL_ALREADY_EXIST)
        }
        var insertDataOpts = {
            collectionName : "users",
            insertObj :{
                "age"  : age,
                "gender" :gender,
                "blood_group" :blood_group,
                "email":email,
                "phone":phone,
                "height":height,
                "bmi":bmi,
                "address":address,
                "creation_datetime":creation_datetime,
                "updation_datetime":updation_datetime,
                "is_active": is_active,
                "is_blocked" : is_blocked,
                "is_deleted" : is_deleted,
                "password" : password,
                "dob" : dob,
                "accessToken" :accessToken
            }
        }
        var insertData = yield mongoService.mongoInsert(req.apiReference, insertDataOpts);
        if(!_.isEmpty(insertData)){
            return responses.sendResponse(res,constants.responseMessage.PATIENT_CREATED,constants.responseFlags.PATIENT_CREATED)
        }
    })().then((data) => {
        console.log(req.apiReference, {RESPONSE: data});
    }, (error) => {
        console.log(req.apiReference, error);
        responses.somethingWentWrongError(res);
    });
}

function patientDetails() {

}
function patientEdit() {

}
function patientRemove() {

}
