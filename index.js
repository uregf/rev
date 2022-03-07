const { Client, Intents, Collection } = require ('discord.js');
require("discord-banner")();
const Discord = require ('discord.js');
const Anime = require ('djs-anime');
const { MessageEmbed } = require ('discord.js');
const { DiscordBanners } = require('discord-banners');
const badges = require("discord-badges");
const { DiscordMenus } = require('discord-menus');
const yts = require("yt-search");
const ultrax = require("ultrax");
const mongoose = require("mongoose");
const moment = require('moment');
const { TicTacToe } = require('djs-games')

const interaction = require ('@discordjs/builders')
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const dotenv = require ('dotenv');
dotenv.config()

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_PRESENCES,
    ],
})

const prefix = ';;';
const fs = require ('fs');
//const fetch = require ('node-fetch');
//const ws = require ('websocket-heartbeat-js')
const axios = require ('axios')
const MenusManager = new DiscordMenus(client);

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('guildMemberAdd', guildMember =>{
    if(guildMember.guild.id === "869076321286893600") {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === '/revolve');
    guildMember.roles.add(welcomeRole);
    
    const embed = new MessageEmbed()
    .setColor('#36393f')
    .setTitle('<:rev12:944109641024045077> Welcome to Revolve.<:rev12:944109641024045077>')
    .setDescription(`welcome <:rev23:908803770933207040> read rules, get your roles in /you/ and get your /hex/ <:rev13:944100681789345792>\n\nsub to https://youtube.com/c/SensoXI`) 
    .setImage(`https://i.postimg.cc/Y25NHHM5/48603-B68-3914-4247-BDB5-577-F50-A87-BFA.jpg`)
    .setFooter(`you're the ${guildMember.guild.memberCount}th member<33`)
  
    guildMember.guild.channels.cache.get('869076322067034150').send({content: `<@!${guildMember.user.id}>`, embeds: [embed]})

    }
  });


  client.on('messageCreate', message => {
    const responseObject = {
      "fuck": "ya life, BING BONG",
      "ur mom": "is in my bed",
    };

    if (message.content.startsWith(responseObject)) return console.log("test");
      
    if(responseObject[message.content]) {
      message.channel.send(responseObject[message.content]);
    }
  
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase();
  
    if (!client.commands.has(commandName)) return;
    console.log(`collected 1 item, ${message}`)
  
    const command = client.commands.get(commandName);
  
    try {
        command.execute(message, args);
     
    } catch (error) {
        console.error(error);
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        message.channel.send(`there was an error trying to execute that command`);
    }
  },
  
    );
  

    client.on('messageCreate', message => {
        if (message.content === 'mbr') {

            const guild = client.guilds.cache.get("869076321286893600");
            //guild.members.cache.filter(member => !member.user.bot).size;

            const embed = new MessageEmbed()
            .setColor('#36393f')
            .setDescription(`**/revolve** has ${guild.members.cache.filter(member => !member.user.bot).size} members`)
            /*.addFields(
                { name: 'latency', value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
                { name: 'api', value: `${Math.round(client.ws.ping)}`, inline: true },
            )*/
    
            message.reply({embeds: [embed]})

        } else if (message.content === 'ping') {

            const member = message.mentions.members.first() || message.member;

            const embed = new MessageEmbed()
            .setColor('#36393f')
            .setDescription(`<@${member.id}>: latency **${Date.now() - message.createdTimestamp}ms** & api **${Math.round(client.ws.ping)}**`)
            /*.addFields(
            { name: 'latency', value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
            { name: 'api', value: `${Math.round(client.ws.ping)}`, inline: true },
        )*/

        message.reply({embeds: [embed]})

        } 
      });

      client.login(process.env.TOKEN)