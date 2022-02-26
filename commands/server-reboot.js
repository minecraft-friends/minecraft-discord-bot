const aws = require('../aws/aws')
module.exports = {
    name: 'server-reboot',
    description: 'Reboots the server',
    usage: 'server-reboot',
    execute: async (client, message, args) => {
        const sentMessage = await message.channel.send("Rebooting the minecraft server...");
        await aws.rebootServer().then(() => {
            sentMessage.edit("The server has rebooted successfully!")
        }).catch(err => {
            sentMessage.edit("Failed to reboot server")
        });
    },
};
