const Database = require("better-sqlite3")
const path = require('node:path');

const pathDb = path.join(__dirname,'calendar.db')
const db=new Database(pathDb)

function initDb(){
    db.prepare(`
        CREATE TABLE IF NOT EXISTS sequences(
            day INT NOT NULL,
            year INT NOT NULL,
            sequence TEXT NOT NULL,
            events TEXT,
            notes TEXT,
            PRIMARY KEY (day, sequence, year)
        )    
   `).run();
}

function add(day, year, sequence,events,notes){
    db.prepare(`INSERT INTO sequences (day,year,sequence,events,notes) 
        VALUES (?,?,?,?,?)
        ON CONFLICT(day,year,sequence)
        DO UPDATE SET 
            events = events || ',' || excluded.events,
            notes = notes || ',' || excluded.notes
        `)
    .run(day, year, sequence,events,notes);
}

function getDay(day,year,sequence){
    return db.prepare(`SELECT * FROM sequences WHERE day = ? AND year = ? AND sequence = ?`).get(day,year,sequence);
}

function getSequence(sequence,year){
    return db.prepare('SELECT * FROM sequences WHERE sequence = ? AND year = ?').all(sequence,year)
}

function removeDay(day, year, sequence){
    return db.prepare('DELETE FROM sequences WHERE day=?, year=?, sequence=?')
    .run(day,year,sequence)
}

function clearSequence(year,sequence){
    return db.prepare('DELETE FROM sequences WHERE year=?, sequence=?')
    .run(year,sequence)
}

function setupShutdownHandler() {
    console.log('[DB] Closing database connection...');
    db.close();
}

module.exports={
    initDb,
    add,
    removeDay,
    setupShutdownHandler,
    getDay,
    getSequence,
    clearSequence
}