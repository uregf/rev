const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute ( interaction, client ) {
        if (interaction.isCommand()) {

            const command = client.commands.get(interaction.commandName);

        if (!command) return ;

        try {
            await command.execute (interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "there was an error trying to execute this command"
            });
        }

        } else if (interaction.isSelectMenu())
        if (interaction.CustomId == "select") {

            const embed = new MessageEmbed()
            .setColor('#37393f')
            .setTitle(`ksdfgn`)
            //.setDescription('Some description here');

                await interaction.followUp({ embeds: [embed] });

        } 
    }
}
