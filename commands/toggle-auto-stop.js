module.exports = {
	name: 'toggle-auto-stop',
	description: 'Toggle the automatic shutdown of the server.',
	usage: 'toggle-auto-stop',
	execute(client, message, args) {
        globalThis.autoStopFlag = !globalThis.autoStopFlag;
		return message.channel.send(`Auto shutdown is now ${globalThis.autoStopFlag ? 'on.' : 'off.'}`);
	},
};