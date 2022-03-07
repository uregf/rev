const discord = require("discord.js");
const yts = require("yt-search");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
    name: 'search',
    //commands: ['wi', 'ui', 'userinfo', 'user'],
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, users, Discord) {

  const channelName = args.join(" ");

  if (!channelName) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "**please enter a youtube channel name**"
      )
      .addFields(
        {name: "usage", value: "```;search [channel]```"},
    )
    .setFooter("[required]")

    message.reply({
      embeds: [errEmbed],
    });
  } else {
    const result = await yts(channelName);
    const channels = result.channels.slice(0, 1);
    channels.forEach(function (c) {
      const ytstatsEmbed = new discord.MessageEmbed()
        .setColor("37393f")
        .setThumbnail(c.image)
        .addFields(
            {name: '**channel name**', value: `${c.name}`, inline: false },
            {name: '**subscribers**', value: `${c.subCount.toLocaleString()}`, inline: true },
            {name: '**videos**', value: `${c.videoCount.toLocaleString()}`, inline: true },
            )

      const row = new discord.MessageActionRow().addComponents(
        new discord.MessageButton()
          .setLabel("channel")
          .setStyle("LINK")
          .setURL(c.url)
      );

      message
        .reply({
          embeds: [
            new discord.MessageEmbed()
              .setColor("#37393f")
              .setDescription("finding stats..."),
          ],
        })
        .then(async (s) => {
          s.edit({
            embeds: [ytstatsEmbed],
            components: [row],
          });
        });
    });
  }
}
}