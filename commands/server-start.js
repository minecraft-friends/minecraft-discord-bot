const aws = require('../aws/aws')
module.exports = {
    name: 'server-start',
    description: 'Starts the server',
    usage: 'server-start',
    execute: async (client, message, args) => {
        const sentMessage = await message.channel.send("Starting the minecraft server...");
        await aws.startServer().then(() => {
            sentMessage.edit("The server has started successfully!")
        }).catch(err => {
            sentMessage.edit("Failed to start server")
        });
    },
};
