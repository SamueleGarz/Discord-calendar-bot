const {SlashCommandBuilder} = require('discord.js');
const db=require("../../database/dbManager.js");
const jsHandler=require('../../jsonData/jsonHandler.js')

module.exports={
    data:new SlashCommandBuilder().setName('ccurrentsequence').setDescription('Return all days with events in a sequence')
    .addBooleanOption((option)=>option.setName("secret").setDescription("Set to true if you want to see the deepest lore")),
    async execute(interaction){
        const data=jsHandler.getData()
        const rows=db.getSequence(data.sequence,data.cycle)
        const sec=interaction.options.getBoolean("secret") ?? false;
        let ret="";
        let i=1;
        if (!rows || rows==undefined || rows.length===0){
            if(sec && jsHandler.isIn(interaction.user.id)){
                ret=`Sequence: ${data.sequence}\nCycle: ${data.cycle}\n**True Cycle:**\n${data.trueCycle}`;  
            }else{
                ret=`Sequence: ${data.sequence}\nCycle: ${data.cycle}\n`;
            }
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
            await interaction.reply({ content: `**Result:** \n${ret}\n**True Cycle:**\n${data.trueCycle}`, ephemeral: true }); 
        }else{
            await interaction.reply(`**Result:** \n${ret}`);
        }
    }
}
