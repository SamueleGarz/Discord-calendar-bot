const db=require('../database/dbManager.js');
const jsHandler=require('../jsonData/jsonHandler.js')

function closeAll(){
    jsHandler.setupShutdownHandler();
    db.setupShutdownHandler();
    process.exit(0);

}

function setupShutDown(){
  process.on('SIGINT', closeAll);  // Ctrl+C
  process.on('SIGTERM', closeAll); // System stop
  process.on('exit', closeAll);
}

module.exports={
    setupShutDown
}