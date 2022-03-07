const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */


 module.exports = {
    name: 'kick',
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, Discord) {

  const permission = message.member.permissions.has("KICK_MEMBERS");
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
        "**please mention a user to kick**"
      )
      .addFields(
          {name: "usage", value: "```;kick [user] {reason}```"},
      )
      .setFooter("[required] {optional}")

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (user === message.author) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription("you can't kick yourself");

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    user
      .kick(reason)
      .then(() => {
        const kickEmbed = new discord.MessageEmbed()
          .setColor("37393f")
          .setTitle("kicked a user")
          .setDescription(
            `user kicked: <@${user.id}>\nmoderator: <@${message.author.id}>\nreason: **${reason}**`
          )
          .setTimestamp();

        message.reply({
          embeds: [kickEmbed],
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