const {SlashCommandBuilder} = require('discord.js');
const db=require("../../database/dbManager.js");
const jsHandler=require('../../jsonData/jsonHandler.js')

module.exports={
    data:new SlashCommandBuilder().setName('cgetsequence').setDescription('Return all days with events in a sequence')
    .addNumberOption((option)=>option.setName("cycle").setDescription("Cycle of the sequence to find").setRequired(true))
    .addStringOption((option)=>option.setName("sequence").setDescription("Sequence").setRequired(true).addChoices(
				{ name: 'Sun', value: 'sun' },
				{ name: 'Earth', value: 'earth' },
                { name: 'Fire', value: 'fire' },
                { name: 'Moon', value: 'moon' },
                { name: 'Air', value: 'air' },
                { name: 'Water', value: 'water' },
			))
    .addBooleanOption((option)=>option.setName("secret").setDescription("Set to true if you want to see the deepest lore")),
    async execute(interaction){
        const day=interaction.options.getNumber("day");
        const cycle=interaction.options.getNumber("cycle");
        const sequence=interaction.options.getString("sequence");
        const sec=interaction.options.getBoolean("secret") ?? false;
        const rows=db.getSequence(sequence,cycle)
        let ret="";
        let i=1;
        if (!rows || rows==undefined){
            ret="No day found";
        }else{
            rows.forEach( row=>{
                if(sec && jsHandler.isIn(interaction.user.id)){
                    ret+=`**Result ${i}:**\nDay: ${row.day}\nSequence: ${row.sequence}\nCycle: ${row.year}\nEvents:\n\t${row.events.replace(",","\n\t")}\nHidden Events:\n-${row.notes.replace(",","\n-")}\n`;
                }else{
                    ret+=`**Result ${i}:**\nDay: ${row.day}\nSequence: ${row.sequence}\nCycle: ${row.year}\nEvents:\n\t${row.events.replace(",","\n\t")}\n`;
                }
                i++;
            });
        }
        if(sec && jsHandler.isIn(interaction.user.id)){
            await interaction.reply({ content: `**Result:** \n${ret}`, ephemeral: true }); 
        }else{
            await interaction.reply(`**Result:** \n${ret}`);
        }
    }
}
