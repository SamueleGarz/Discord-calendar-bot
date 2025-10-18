const {SlashCommandBuilder} = require('discord.js');
const db=require("../../database/dbManager.js");

module.exports={
    data:new SlashCommandBuilder().setName('cclearsequence').setDescription('Remove all days / events from a sequence')
    .addNumberOption((option)=>option.setName("cycle").setDescription("Cycle of the sequence to remove").setRequired(true))
    .addStringOption((option)=>option.setName("sequence").setDescription("Sequence to clear").setRequired(true).addChoices(
				{ name: 'Sun', value: 'sun' },
				{ name: 'Earth', value: 'earth' },
                { name: 'Fire', value: 'fire' },
                { name: 'Moon', value: 'moon' },
                { name: 'Air', value: 'air' },
                { name: 'Water', value: 'water' },
			)),
    async execute(interaction){
        const cycle=interaction.options.getNumber("cycle");
        const sequence=interaction.options.getString("sequence");
        const row=db.clearSequence(cycle,sequence)
        let ret;
        if (row.changes==0){
            ret="No changes made";
        }else{
            ret=`Removed ${row.changes} elements`;
        }
        await interaction.reply(`${ret}`);
    }
}
