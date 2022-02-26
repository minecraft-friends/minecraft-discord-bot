const aws = require('../aws/aws')
module.exports = {
    name: 'server-status',
    description: 'Returns the status of the server',
    usage: 'server-status',
    execute: async (client, message, args) => {
        const sentMessage = await message.channel.send("Requesting status of the minecraft server...");
        await aws.serverStatus().then((status) => {
            sentMessage.edit(`Server is ${status}`)
        }).catch(err => {
            sentMessage.edit("Failed to get server status")
        });
    },
};
