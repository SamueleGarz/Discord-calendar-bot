const fs = require('node:fs');
const { get } = require('node:http');
const path = require('node:path');

const pathJs = path.join(__dirname,'data.json')
let stored={};
let saveFlag=false;
let saveInterval=null;

function load(){
    stored=JSON.parse(fs.readFileSync(pathJs,'utf8'));
}

function store(){
    if (saveFlag){
        try{
            fs.writeFileSync(pathJs,JSON.stringify(stored,null,2));
            saveFlag=false;
        }catch(err){
            console.log("Error on saving data: "+err);
        }
    }
}

function startAutoSave() {
  if (saveInterval) clearInterval(saveInterval);
  saveInterval = setInterval(store, 10 * 60 * 1000); // 10 minutes
}

function getData(){
    return stored;
}

function updateData(newData){
    saveFlag=true;
    stored=newData;
}

function setupShutdownHandler() {
    console.log('[JSON Handler] Shutting down, saving data...');
    store();
}

function isIn(id){
    return stored.allowed_users.includes(id);
}


module.exports={
    load,
    store,
    startAutoSave,
    getData,
    updateData,
    setupShutdownHandler,
    isIn
}
