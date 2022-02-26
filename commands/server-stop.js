const aws = require('../aws/aws')
module.exports = {
    name: 'server-stop',
    description: 'Stops the server',
    usage: 'server-stop',
    execute: async (client, message, args) => {
        const sentMessage = await message.channel.send("Stopping the minecraft server...");
        await aws.stopServer().then(() => {
            sentMessage.edit("The server has stopped successfully!")
        }).catch(err => {
            sentMessage.edit("Failed to stop server")
        });
    },
};
