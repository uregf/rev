const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
    name: 'timeout',
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, Discord) {

  const permission =
    message.member.permissions.has("KICK_MEMBERS") ||
    message.member.permissions.has("BAN_MEMBERS");
  const user = message.mentions.members.first();
  const timeoutDuration = args[1];
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
        "**please mention a user to timeout**"
      )
      .addFields(
          {name: "usage", value: "```;timeout [user] [timeout duration in minutes] {reason}```"},
      )
      .setFooter("[required] {optional}")

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (!timeoutDuration) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "please enter the timeout duration in **minutes**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    user
      .timeout(5 * 60 * 1000, reason)
      .then(() => {
        const timeoutEmbed = new discord.MessageEmbed()
          .setColor("37393f")
          .setTitle("timedout a user")
          .setDescription(
            `user timedout: <@${user.id}>\nmoderator: <@${message.author.id}>\nduration: **${timeoutDuration} minute(s)\n**reason: **${reason}**`
          );

        message.reply({
          embeds: [timeoutEmbed],
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