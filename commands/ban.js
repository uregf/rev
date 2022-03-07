const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
  name: 'ban',
  description: 'gives a role',
  allowedMentions: {
      repliedUser: false
  },
  async execute(message, args, client, Discord) {

  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  const permission = member.roles.cache.has('878552100542480395');
  const user = message.mentions.members.first();
  const reason = args.slice(1).join(" ") || "no reason provided";

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
        "**please mention a user to ban**"
      )
      .addFields(
          {name: "usage", value: "```;ban [user] {reason}```"},
      )
      .setFooter("[required] {optional}")

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (user === message.author) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription("you cant ban yourself");

    message.reply({
      embeds: [errEmbed3],
    });
  } else if (user === permission) {
    const errEmbed5 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription("you cant ban this user");

    message.reply({
      embeds: [errEmbed5],
    });
  } else {
    user
      .ban({
        reason: reason,
      })
      .then(() => {
        const banEmbed = new discord.MessageEmbed()
          .setColor("37393f")
          .setTitle("banned a user")
          .setDescription(
            `user banned: <@${user.id}>\nmoderator: <@${message.author.id}>\nreason: **${reason}**`
          )
          .setTimestamp();

        message.reply({
          embeds: [banEmbed],
        });
      })
      .catch((err) => {
        console.log(err);
        message.reply({
          content: "error",
        });
      });
  }
}

}