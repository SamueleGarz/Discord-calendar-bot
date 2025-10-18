const {SlashCommandBuilder} = require('discord.js');
const db=require("../../database/dbManager.js");
const jsHandler=require('../../jsonData/jsonHandler.js')

module.exports={
    data:new SlashCommandBuilder().setName('cgetday').setDescription('Get the events of a day')
    .addNumberOption((option)=>option.setName("day").setDescription("Number of the day").setRequired(true))
    .addNumberOption((option)=>option.setName("cycle").setDescription("Cycle of the day").setRequired(true))
    .addStringOption((option)=>option.setName("sequence").setDescription("Sequence the day belongs to").setRequired(true).addChoices(
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
        const row=db.getDay(day,cycle,sequence);
        let ret;
        if (!row || row==undefined){
            ret="No day found";
        }else{
            ret=`Day: ${row.day}\nSequence: ${row.sequence}\nCycle: ${row.year}\nEvents:\n-${row.events.replace(",","\n-")}`;
        }

        if(sec && jsHandler.isIn(interaction.user.id)){
            await interaction.reply({ content: `**Result:** \n${ret+`\nHidden Events:\n-${row.notes.replace(",","\n-")}`}`, ephemeral: true }); 
        }else{
            await interaction.reply(`**Result:** \n${ret}`);
        }
    }
}
