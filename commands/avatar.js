const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
    name: 'av',
    aliases: ["pfp"],
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, Discord) {

  const user = message.mentions.users.first() || message.author;

  const avatarEmbed = new discord.MessageEmbed()
    .setColor("#37393f")
    .setAuthor({
      name: `${user.username}'s avatar`,
      iconURL: `${user.displayAvatarURL({ dynamic: true })}`,
    })
    .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
    

  const row = new discord.MessageActionRow().addComponents(
    new discord.MessageButton()
      .setLabel("link")
      .setStyle("LINK")
      .setURL(user.avatarURL({ dynamic: true, format: "gif", size: 512 }))
  );

  message.reply({
    embeds: [avatarEmbed],
    components: [row],
  });
}

}