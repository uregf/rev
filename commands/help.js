const discord = require("discord.js");
const ultrax = require("ultrax");

/**
 * @param {discord.Client} client
 * @param {discord.Message} message
 * @param {String[]} args
 */

module.exports = {
  name: 'help',
  //commands: ['wi', 'ui', 'userinfo', 'user'],
  description: 'gives a role',
  allowedMentions: {
    repliedUser: false
  },
  async execute(message, args, client, user, Discord) {

    const topic = args[0];
    const boturl = `https://cdn.discordapp.com/avatars/935904701390663730/080e4127651e2dfd3f33fd64abca283f.png?size=4096`

    const buttonBack = new discord.MessageButton()
      .setStyle("SECONDARY")
      .setEmoji('<:left_dntsteal:950067034404847656>')

    const buttonForward = new discord.MessageButton()
      .setStyle("SECONDARY")
      .setEmoji("<:right_dntsteal:950067113257738250>");

    const help = new discord.MessageEmbed()
      .setColor("37393f")
      .setTitle('rev help')
      .setDescription('**prefix** ;')
      .setThumbnail(`${boturl}`)
      .addFields(
        { name: `**categories**`, value: `moderation\ninformation\nfun\nutility\neconomy`, inline: false },
        { name: '**other**', value: `[support](https://discord.gg/revolve)`, inline: false },
      )
      .setFooter("page 1 of 4")


    const mod = new discord.MessageEmbed()
      .setColor("37393f")
      .setTitle('rev help')
      .addFields(
        { name: '**moderation**', value: '`kick` `ban` `softban` `unban` `timeout` `warn` `slowmode` `setnick` `purge` `mute` `unmute`', inline: false },
        { name: '**information**', value: '`bot` `whois` `server` `av` `banner` `youtube` `search`', inline: false },
      )
      .setFooter("page 2 of 4")

    const fun = new discord.MessageEmbed()
      .setColor("37393f")
      .setTitle('rev help')
      .addFields(
        { name: '**fun**', value: '`8ball` `roast` `meme` `gay` `simp` `pp` `urban` `kill` `coinflip` `kiss` `hug` `lick` `cuddle` `bully` `poke` `slap` `dance` `bite` `yeet` `pat` `cry` `wiki`', inline: false },
        { name: '**utility**', value: '`help` `uptime` `ping` `pop`', inline: false },
      )
      .setFooter("page 3 of 4")

    const util = new discord.MessageEmbed()
      .setColor("37393f")
      .setTitle('rev help')
      .addFields(
        { name: '**economy**', value: 'in progress of being coded', inline: false },
      )
      .setFooter("page 4 of 4")

    await ultrax.ButtonPaginator(
      message,
      [help, mod, fun, util],
      [buttonBack, buttonForward]
    );

  }
}
