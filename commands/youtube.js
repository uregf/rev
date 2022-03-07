const discord = require("discord.js");
const yts = require("yt-search");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
    name: 'youtube',
    commands: ['wi', 'ui', 'userinfo', 'user'],
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, users, Discord) {

  const query = args.join(" ");

  if (!message.channel) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("RED")
      .setDescription("You can use this command in a NSFW channel.");

    message.reply({
      embeds: [errEmbed],
    });
  } else {
    if (!query) {
      const errEmbed2 = new discord.MessageEmbed()
        .setColor("37393f")
        .setDescription(
          "**please enter a search query**"
        )
        .addFields(
          {name: "usage", value: "```;youtube [query]```"},
      )
      .setFooter("[required]")

      message.reply({
        embeds: [errEmbed2],
      });
    } else {
      const result = await yts(query);
      const videos = result.videos.slice(0, 1);
      videos.forEach(function (v) {
        message.reply({
          content: `${v.url}`,
        });
      });
    }
  }
}

 }