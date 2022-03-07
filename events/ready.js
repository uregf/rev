const { Guild } = require("discord.js")

module.exports = {
	name: 'ready',
	once: true,
	execute(client, message) {

		console.log(`ready! logged in as ${client.user.tag}`);

		client.user.setActivity(`${client.users.cache.size} users`, {
			type:"STREAMING",
			url: "https://www.twitch.tv/sensoxi"
		});
	},
};