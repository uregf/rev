const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
    name: 'softban',
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, Discord) {

  const permission = message.member.permissions.has("BAN_MEMBERS");
  const user = message.mentions.members.first();
  const banDuration = args[1];
  const reason = args.slice(2).join(" ") || "no reason provided";

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
        "**please mention a user to softban**"
      )
      .addFields(
          {name: "usage", value: "```;softban [user] [duration in days] {reason}```"},
      )
      .setFooter("[required] {optional}")

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!banDuration) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "please enter the ban duration in days"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else if (user === message.author) {
    const errEmbed4 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription("you can't softban yourself");

    message.reply({
      embeds: [errEmbed4],
    });
  } else {
    user
      .ban({
        reason: reason,
        days: banDuration,
      })
      .then(() => {
        const softbanEmbed = new discord.MessageEmbed()
          .setColor("37393f")
          .setTitle("Soft Banned a user")
          .setDescription(
            `user soft banned: <@${user.id}>\nmoderator: <@${message.author.id}>\nban duration: **${banDuration} day(s)**\nreason: **${reason}**`
          )
          .setTimestamp();

        message.reply({
          embeds: [softbanEmbed],
        });
      })
      .catch((err) => {
        console.log(err);
        message.reply({
          content: "An error occurred while running this command.",
        });
      });
  }
}
}