const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
    name: 'setnick',
    //commands: ['wi', 'ui', 'userinfo', 'user'],
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, users, Discord) {

  const permission = message.member.permissions.has("MANAGE_NICKNAMES");
  const user = message.mentions.users.first();
  const nickname = args.slice(1).join(" ");

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "no perms, L bozo"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!user) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "**please mention a user**"
      )
      .addFields(
        {name: "usage", value: "```;setnick [user] [nickname]```"},
    )
    .setFooter("[required] {optional}")

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!nickname) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("37393f")
      .setFooter('setnick [user] [nickname]')
      .setDescription(
        "please provide a nickname"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    const member = message.guild.members.cache.get(user.id);

    await member
      .setNickname(nickname)
      .then(() => {
        const nicknameEmbed = new discord.MessageEmbed()
          .setColor("37393f")
          .setDescription(
            `successfully changed **${user.username}'s** nickname to **${nickname}**`
          );

        message.reply({
          embeds: [nicknameEmbed],
        });
      })
      .catch((err) => {
        console.log(err);
        message.reply({
          content: "an error occurred while running this command",
        });
      });
  }
}
} 
