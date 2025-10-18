const {SlashCommandBuilder}=require('discord.js');
const jsHandler=require('../../jsonData/jsonHandler.js')
const sequencesMapping=JSON.parse('{"sun":0,"earth":1,"fire":2,"moon":3,"air":4,"water":5}')
const sequencesDays=[25,93,93,25,93,93]

module.exports={
    data:new SlashCommandBuilder().setName('cmoveday').setDescription('Work in progress')
    .addNumberOption((option)=>option.setName("days").setDescription("Number of days to move, either positive or negative").setRequired(true))
    .addBooleanOption((option)=>option.setName("secret").setDescription("Set to true if you want to see the deepest lore")),
    async execute(interaction){
        let data=jsHandler.getData()
        let currentDay=data.day;
        const incrementDay=interaction.options.getNumber("day");
        let currentSeq=sequencesMapping[data.sequence]
        let sequenceDays=sequencesDays[currentSeq]
        let currentCycle=data.cycle;
        const sec=interaction.options.getBoolean("secret") ?? false;
        let trueCyc=data.trueCycle

        if(incrementDay>=0){
            currentDay+=incrementDay;
        }else{
            currentDay-=incrementDay;
        }

        while(Math.abs(currentDay)-sequenceDays>0){
            if(currentDay>0){
                currentDay-=sequenceDays;
                currentSeq=currentSeq+1;
            }else{
                currentDay+=sequenceDays;
                currentSeq=currentSeq-1;
            }
            if(currentSeq>6){
                currentCycle++;
                trueCyc++;
                currentSeq=0;
            }
            if(currentSeq<0){
                currentCycle--;
                trueCyc--;
                currentSeq=6;
            }
            sequenceDays=sequenceDays[currentSeq];
        }
        data.day=currentDay;
        data.sequence=Object.keys(sequencesMapping).find(k => sequencesMapping[k] === currentSeq);
        data.cycle=currentCycle;
        data.trueCycle=trueCyc;

        jsHandler.updateData(data);
        
        const row=db.getDay(data.day,data.cycle,data.sequence);
        let ret;
        if (!row || row==undefined){
            ret="No day found";
        }else{
            ret=`Day: ${row.day}\nSequence: ${row.sequence}\nCycle: ${row.year}\nEvents:\n-${row.events.replace(",","\n-")}`;
        }
        if(sec && jsHandler.isIn(interaction.user.id)){
            await interaction.reply({ content: `**Result:** \n${ret+`\nHidden Events-${row.notes.replace(",","\n-")}\n**True Cycle:**\n${data.trueCycle}`}`, ephemeral: true }); 
        }else{
            await interaction.reply(`**Result:** \n${ret}`);
        }
    }
}
