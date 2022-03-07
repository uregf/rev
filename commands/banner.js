const { MessageEmbed } = require('discord.js');
const discord = require("discord.js");
const { Guild } = require("discord.js");
//const bannerURL = require('discord-banner');
const { DiscordBanners } = require('discord-banners');
const banner = require('discord-banners-js')
//const discordBanners = require('/Users/jess/Desktop/sick v2/index.js');
//const TOKEN = require ('dotenv');

module.exports = {
    name: 'banner',
    description: 'gives a role',
    allowedMentions: {
        repliedUser: false
    },
    async execute(message, args, client, Discord) {
        
        const user = message.mentions.members.first() || message.member
        const bannerurl = await banner(user.user.id, process.env.TOKEN, { size : 4096 })
        
        if(bannerurl) {

            const embed = new MessageEmbed() 
            .setAuthor({
                name: `${user.user.username}'s banner`,
                iconURL: `${user.displayAvatarURL({ dynamic: true })}`,
              })
            .setImage(`${bannerurl}`)
            .setColor(`37393f`)
            
            const row = new discord.MessageActionRow().addComponents(
                new discord.MessageButton()
                  .setLabel("link")
                  .setStyle("LINK")
                  .setURL(`${bannerurl}`)
              );
            
              message.reply({
                embeds: [embed],
                components: [row],
              });

        }
        else { 

            const embed1 = new MessageEmbed() 
            .setDescription(`${user.user.tag} has no bannner`)
            .setColor(`37393f`)
            
            return message.reply({embeds: [embed1]}) 

}

        }
    }