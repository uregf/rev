const { MessageEmbed } = require('discord.js');
const { Guild } = require("discord.js");
const moment = require('moment');
const banner = require('discord-banners-js')


module.exports = {
    name: 'whois',
    commands: ['wi', 'ui', 'userinfo', 'user'],
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, users, Discord) {

        const status = {
            Online: "online",
            Idle: "idle",
            Dnd: "do not disturb",
            Offline: "offline",
          };

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const memberCount = message.guild.members.cache.filter(member => !member.user.bot).size;
        const channels = message.guild.channels.cache
        const bannerurl = await banner(user.user.id, 'OTM1OTA0NzAxMzkwNjYzNzMw.YfFbLQ.n2bZJ09DmLFDbDGLu4kigLzP5D0', { size : 4096 })
        //const users = message.guild.members.cache;
        //const user = client.users.cache.get(message.author.id); 

        const embed = new MessageEmbed()
        .setColor('#36393f')
        .setAuthor(`${message.guild.name}`, `${member.user.displayAvatarURL({ dynamic : true })}`)
        .setDescription(`${member.user.tag}`)
        .addFields(
            {name: '**created**', value: `${moment(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, inline: true },
            {name: '**joined**', value: `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, inline: true },
            {name: `**roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]**`, value: `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id }>`).join(" **|** ") || "no roles"}`, inline: true },
            {name: '**nickname**', value: `${member.nickname !== null ? `${member.nickname}` : "n/a"}`, inline: true },
            {name: '**status**', value: `${member.presence == null ? "offline" : member.presence.status}`, inline: true },
            {name: '**playing**', value: `${member.user.presence?.game? `${member.user.presence?.game.name}`: "nothing"}`, inline: true },
            //{name: '**acknowledgements**', value: `${acknowledgements}`, inline: true },
            {name: '**design**', value: `user avatar: [click](${member.user.displayAvatarURL({ dynamic : true })})\nuser banner: [click](${bannerurl})`, inline: true },
        )
        .setThumbnail(`${member.user.displayAvatarURL({ dynamic : true })}`)
        .setFooter(`${member.user.id}`)

        message.reply({embeds: [embed]})

        }
    }


    