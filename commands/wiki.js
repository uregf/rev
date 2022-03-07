const discord = require("discord.js");
const ultrax = require("ultrax");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

 module.exports = {
    name: 'wiki',
    commands: ['wi', 'ui', 'userinfo', 'user'],
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, users, Discord) {

  const query = args.join(" ");

  if (!query) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "**please enter a search query**"
      )
      .addFields(
        {name: "usage", value: "```;wiki [query]```"},
    )
    .setFooter("[required]")

    message.reply({
      embeds: [errEmbed],
    });
  } else {
    const reply = new ultrax.Wikipedia({
      color: "37393f",
      query: query,
      message: message,
    });

    reply.fetch();
  }
}
}