const {SlashCommandBuilder} = require('discord.js');

module.exports={
    data:new SlashCommandBuilder().setName('server').setDescription('Give server info'),
    async execute(interaction){
        await interaction.reply('Server name: $'+interaction.guild.name+' \nMembers count: '+interaction.guild.memberCount);
    }
}

