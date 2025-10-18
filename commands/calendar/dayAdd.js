const {SlashCommandBuilder} = require('discord.js');
const db=require("../../database/dbManager.js");
const jsHandler=require('../../jsonData/jsonHandler.js')
const sequencesMapping=JSON.parse('{"sun":0,"earth":1,"fire":2,"moon":3,"air":4,"water":5}')
const sequencesDays=[25,93,93,25,93,93]

module.exports={
    data:new SlashCommandBuilder().setName('caddday').setDescription('Add or remove days')
    .addNumberOption((option)=>option.setName("day").setDescription("Number of the day to insert").setRequired(true))
    .addNumberOption((option)=>option.setName("cycle").setDescription("Cycle of the day to insert").setRequired(true))
    .addStringOption((option)=>option.setName("sequence").setDescription("Sequence the day belongs to").setRequired(true).addChoices(
				{ name: 'Sun', value: 'sun' },
				{ name: 'Earth', value: 'earth' },
                { name: 'Fire', value: 'fire' },
                { name: 'Moon', value: 'moon' },
                { name: 'Air', value: 'air' },
                { name: 'Water', value: 'water' },
			))
    .addStringOption((option)=>option.setName("events").setDescription("Any events to add to the day (separate each with a ,)"))
    .addStringOption((option)=>option.setName("notes").setDescription("Any notes to add to the day, only the master will see them"))
    .addBooleanOption((option)=>option.setName("secret").setDescription("Set to true if you want to see the deepest lore")),
    async execute(interaction){
        const day=interaction.options.getNumber("day");
        const cycle=interaction.options.getNumber("cycle");
        const sequence=interaction.options.getString("sequence");
        const events=interaction.options.getString("events") ?? "";
        const notes=interaction.options.getString("notes") ?? "";
        const sec=interaction.options.getBoolean("secret") ?? false;
        if(day>sequencesDays[sequencesMapping[sequence]]) day=sequencesDays[sequencesMapping[sequence]];
        if(day<1) day=0;
        db.add(day,cycle,sequence,events,notes)
        ret=`Added date: "${day}/${sequence}/${cycle}" with event "${events}".`;
        if(sec && jsHandler.isIn(interaction.user.id)){
            await interaction.reply({ content: `**Result:** \n${ret+`\nHidden Events:\n-${notes.replace(",","\n-")}`}`, ephemeral: true }); 
        }else{
            await interaction.reply(`**Result:** \n${ret}`);
        }
    }
}
