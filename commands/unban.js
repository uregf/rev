const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
    name: 'unban',
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, Discord) {

  const permission = message.member.permissions.has("BAN_MEMBERS");
  const userId = args[0];
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
  } else if (!userId) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "**please enter the user id**"
      )
      .addFields(
          {name: "usage", value: "```;unban [user id]```"},
      )
      .setFooter("[required] {optional}")

    message.reply({
      embeds: [errEmbed2],
    });
  } else {
    const totalBans = await message.guild.bans.fetch();
    const member = totalBans.find((x) => x.user.id === userId);

    if (!member) {
      const errEmbed3 = new discord.MessageEmbed()
        .setColor("37393f")
        .setDescription("this user doesn't exist in the ban list");

      message.reply({
        embeds: [errEmbed3],
      });
    } else {
      message.guild.members
        .unban(userId, reason)
        .then(() => {
          const unbanEmbed = new discord.MessageEmbed()
            .setColor("37393f")
            .setTitle("Unbanned a user")
            .setDescription(
              `user unbanned: <@${userId}>\nmoderator: <@${message.author.id}>\nreason: **${reason}**`
            )
            .setTimestamp();

          message.reply({
            embeds: [unbanEmbed],
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
}