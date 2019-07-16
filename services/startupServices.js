const apiReferenceModule                          = "startup";

const Promise                                     = require('bluebird');
const envDetails                                  = require('./../properties/environmentDetails');
const MongoClient                                 = require('mongodb').MongoClient;
const http                                        = require('http');

exports.initializeServer                        = initializeServer;


function initializeServer() {
    var express = require('express')
    var bodyParser = require('body-parser')
    var app = express()
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


app.post('/himanshu', function (req, res) {
    
    console.log(req.body.List_of_IPS);
    var res2 = req.body.List_of_IPS.split(",");
    for(var i=0;i<res2.length;i++)
    {
        console.log(i+"th element:"+res2[i].trim()); 
    }
    //console.log(res2); 
  res.send('hello world');
})

app.listen(3000)
}

function initializeMongoConnectionPool(config, opts) {
    return new Promise((resolve,reject)=>{
        MongoClient.connect(config,opts, function (err, result) {
            if(err){
                console.log("Error connecting Mongo Database");
                reject(err)
            }
            console.log("########## Mongo Connected ##########");
            const dbo = result.db('project')
            resolve(dbo);
        })
    })
}

function startHttpServer(port) {
    return new Promise((resolve,reject) => {
        console.log("asdasd",);
        var server = http.createServer(app).listen(port, function (err, result) {
            if(err)
                reject(err);
            console.error("###################### Express connected ##################", port, app.get('env'));
            resolve(server);
        });
    });
}

function checkAdminExistence() {
    return new Promise((resolve, reject) => {
        Promise.coroutine(function* () {
            const admin = db.collection('admin').find({})  ;
            console.log("admin >>>>>>>", admin);
            if (admin) {
                console.log("############# Admin Exists ###############");
                resolve();
            }
            let adminData = {
                name: "admin1",
                email: "admin@project.com",
                password: "123456",
                role: "admin",
            };
            const insertData = db.createCollection('admin', adminData);
            if(!insertData) {
                console.log("Admin data inserted");
                resolve();
            }
        })().then((data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    })
}
