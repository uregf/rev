const discord = require("discord.js");
/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
    name: 'twitch',
    //commands: ['wi', 'ui', 'userinfo', 'user'],
    //description: 'gives a role',
    //permissions: 'MANAGE_MESSAGES',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, users, Discord) {

  const donateEmbed = new discord.MessageEmbed()
    .setColor("37393f")
    .setDescription(
      "the idiots twitch link ye :thumbsup:"
    )

  const row = new discord.MessageActionRow().addComponents(
    new discord.MessageButton()
      .setLabel("twitch")
      .setStyle("LINK")
      .setURL("https://www.twitch.tv/sensoxi")
  );

  message.reply({
    embeds: [donateEmbed],
    components: [row],
  });
}

}