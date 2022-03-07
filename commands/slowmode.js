const discord = require("discord.js");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
    name: 'slowmode',
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, Discord) {

  const permission = message.member.permissions.has("MANAGE_CHANNELS");
  const channel = message.channel;
  const slowmodeDuration = args[0];

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "no perms, L bozo"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!slowmodeDuration) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "**please enter the slowmode duration in seconds**"
      )
      .addFields(
          {name: "usage", value: "```;slowmode [slowmode duration in seconds]```"},
      )
      .setFooter("[required] {optional}")

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (slowmodeDuration > 21600 || slowmodeDuration < 5) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "minimum limit: **5 seconds**\nmaximum limit: **21,600 seconds**"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else {
    channel
      .setRateLimitPerUser(slowmodeDuration)
      .then(() => {
        const slowmodeEmbed = new discord.MessageEmbed()
          .setColor("37393f")
          .setDescription(
            `successfuly set slowmode of **${slowmodeDuration} seconds** for this channel`
          );

        message.reply({
          embeds: [slowmodeEmbed],
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