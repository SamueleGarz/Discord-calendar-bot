const {SlashCommandBuilder} = require('discord.js');
const db=require("../../database/dbManager.js");
const jsHandler=require('../../jsonData/jsonHandler.js')

module.exports={
    data:new SlashCommandBuilder().setName('ccurrentday').setDescription('Get the events of a day')
    .addBooleanOption((option)=>option.setName("secret").setDescription("Set to true if you want to see the deepest lore")),
    async execute(interaction){
        const sec=interaction.options.getBoolean("secret") ?? false;
        const data=jsHandler.getData()
        const row=db.getDay(data.day,data.cycle,data.sequence);
        let ret;
        if (!row || row==undefined){
            if(sec && jsHandler.isIn(interaction.user.id)){
                ret=`Day: ${data.day}\nSequence: ${data.sequence}\nCycle: ${data.cycle}\nEvents:\n-\nHidden Events:\n-\n**True Cycle:**\n${data.trueCycle}`;  
            }else{
                ret=`Day: ${data.day}\nSequence: ${data.sequence}\nCycle: ${data.cycle}\nEvents:\n-\n`;
            }
        }else{
            if(sec && jsHandler.isIn(interaction.user.id)){
                ret=`Day: ${row.day}\nSequence: ${row.sequence}\nCycle: ${row.year}\nEvents:\n-${row.events.replace(",","\n-")}\nHidden Events:\n-${row.notes.replace(",","\n-")}\n**True Cycle:**\n${data.trueCycle}`;  
            }else{
                ret=`Day: ${row.day}\nSequence: ${row.sequence}\nCycle: ${row.year}\nEvents:\n-${row.events.replace(",","\n-")}`;
            }
        }
        if(sec && jsHandler.isIn(interaction.user.id)){
            await interaction.reply({ content: `**Result:** \n${ret}`, ephemeral: true }); 
        }else{
            await interaction.reply(`**Result:** \n${ret}`);
        }
    }
}
