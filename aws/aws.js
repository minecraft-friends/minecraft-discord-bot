const AWS = require("aws-sdk");
fs = require('fs');
require('dotenv').config();

module.exports = {
    getUser: getUser,
    getConfig: getConfig
}

function getUser() {
    let callerPromise = new AWS.STS().getCallerIdentity().promise();
    callerPromise.then(value => {
        console.log("arn: " + value.Arn);
    }).catch(error => {
        console.log(error);
    })
}

async function getConfig() {
    let getObjectRequest  = {
        Bucket: process.env.BUCKET_NAME,
        Key: process.env.BUCKET_KEY_NAME,
    };
    let bucketPromise = new AWS.S3().getObject(getObjectRequest).promise();
    await bucketPromise.then(value => {
        console.log("writing config.json")
        fs.createWriteStream("config.json").write(value.Body);
    }).catch(err => {
        console.log(err);
    })
}
