const AWS = require("aws-sdk");
fs = require('fs');
require('dotenv').config();

module.exports = {
    getUser: getUser,
    getConfig: getConfig,
    stopServer: stopServer,
    startServer: startServer,
    rebootServer: rebootServer,
    serverStatus: serverStatus,
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
        console.log(`writing config.json from ${getObjectRequest.Bucket}/${getObjectRequest.Key}`)
        fs.createWriteStream("config.json").write(value.Body);
    }).catch(err => {
        console.log(err);
    })
}

async function stopServer() {
    let params = {
        InstanceIds: [
            process.env.EC2_INSTANCE_ID
        ]
    };

    let stopInstancePromise = new AWS.EC2().stopInstances(params).promise();
    await stopInstancePromise.then(() => {
    }).catch(err => {
        throw err
    })
}

async function startServer() {
    let params = {
        InstanceIds: [
            process.env.EC2_INSTANCE_ID
        ]
    };

    let startInstancePromise = new AWS.EC2().startInstances(params).promise();
    await startInstancePromise.then(() => {
    }).catch(err => {
        throw err
    })
}

async function rebootServer() {
    let params = {
        InstanceIds: [
            process.env.EC2_INSTANCE_ID
        ]
    };

    let rebootInstancePromise = new AWS.EC2().rebootInstances(params).promise();
    await rebootInstancePromise.then(() => {
    }).catch(err => {
        throw err
    })
}

async function serverStatus() {
    let params = {
        InstanceIds: [
            process.env.EC2_INSTANCE_ID
        ],
        IncludeAllInstances: true
    };

    let describeInstancePromise = new AWS.EC2().describeInstanceStatus(params).promise();
    return await describeInstancePromise.then(value => {
        return value.InstanceStatuses[0].InstanceState.Name.toString()
    }).catch(err => {
        throw err
    })
}
