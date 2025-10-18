const {SlashCommandBuilder} = require('discord.js');
const db=require("../../database/dbManager.js");

module.exports={
    data:new SlashCommandBuilder().setName('cclearday').setDescription('Add or remove days')
    .addNumberOption((option)=>option.setName("day").setDescription("Date of the day to remove").setRequired(true))
    .addNumberOption((option)=>option.setName("cycle").setDescription("Cyle of the day to remove (year)").setRequired(true))
    .addStringOption((option)=>option.setName("sequence").setDescription("Sequence the day belongs to").setRequired(true).addChoices(
				{ name: 'Sun', value: 'sun' },
				{ name: 'Earth', value: 'earth' },
                { name: 'Fire', value: 'fire' },
                { name: 'Moon', value: 'moon' },
                { name: 'Air', value: 'air' },
                { name: 'Water', value: 'water' },
			)),
    async execute(interaction){
        const day=interaction.options.getNumber("day");
        const cycle=interaction.options.getNumber("cycle");
        const sequence=interaction.options.getString("sequence");
        const row=db.removeDay(day,cycle,sequence)
        let ret;
        if (row.changes==0){
            ret="No changes made";
        }else{
            ret=`Removed ${row.changes} elements`;
        }
        await interaction.reply(`${ret}`);
        // await interaction.reply({ content: 'Secret Pong!', flags: MessageFlags.Ephemeral }); 
    }
}
