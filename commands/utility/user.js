const {SlashCommandBuilder} = require('discord.js');

module.exports={
    data:new SlashCommandBuilder().setName('user').setDescription('Give user info'),
    async execute(interaction){
        await interaction.reply(`Run by: ${interaction.user.username}\nJoined on `+interaction.member.joinedAt);
    }
}

