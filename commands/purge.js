const discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { Guild } = require("discord.js");

module.exports = {
    name: 'purge',
    //commands: ['wi', 'ui', 'userinfo', 'user'],
    //description: 'gives a role',
    permissions: 'MANAGE_MESSAGES',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, users, Discord) {

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */


  const permission = message.member.permissions.has("MANAGE_MESSAGES");
  const amount = args[0];

  if (!permission) {
    const errEmbed = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "no perms, L bozo"
      );

    message.reply({
      embeds: [errEmbed],
    });
  } else if (!amount) {
    const errEmbed2 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "**please enter an amount of messages**"
      )
      .addFields(
        {name: "usage", value: "```;purge [amount]```"},
    )
    .setFooter("[required] {optional}")

    message.reply({
      embeds: [errEmbed2],
    });
  } else if (isNaN(amount)) {
    const errEmbed3 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        "please enter a number (1 - 100 )"
      );

    message.reply({
      embeds: [errEmbed3],
    });
  } else if (amount > 100 || amount <= 0) {
    const errEmbed4 = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription("minimum limit is **1**\nmaximum limit is **100**");

    message.reply({
      embeds: [errEmbed4],
    });
  } else {
    message.channel.bulkDelete(amount, true);

    const purgeEmbed = new discord.MessageEmbed()
      .setColor("37393f")
      .setDescription(
        `${message.author} deleted **${amount}** messages in this channel`
      );

    message.reply({
      embeds: [purgeEmbed],
    });
  }
}

    }
