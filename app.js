console.log('Developer: Hari Charan @grep_security');
console.log('This is an experimental app for notebook. This app comes handy when you want to save your notes from the command line');
//console.log('This is not an alternative for notepad');
console.log('commands supported for now: \n'+
'1. add\n'+
'2. read\n'+
'3. list\n'+
'4. remove');
console.log('---------------------------------------------------');


const program = require('commander');

program
.version('0.0.1')
.description('This is an experimental app for notebook. This app comes handy when you want to save your notes.');
  
  
const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const tit = {
    describe:'Title of note',
    demand:true,
    alias: 't' 
};

const bod = {
    describe:'Body of the title',
    demand:true,
    alias:'b'
};

const argv = yargs
.command('add','Add a new note',{
title:tit,
body:bod
})
.command('list','list all nodes')
.command('read', 'read a note',{
    title:tit

})
.command('remove','remove the note',{
    title:tit
})
.help()
.argv;
var command = argv._[0];

//console.log(command);
//console.log('Process', process.argv);
//console.log('Yargs', argv);



if (command === 'add') {
var note = notes.addNote(argv.title,argv.body);
if(note){
    console.log('Note created');
    notes.logNote(note);
}
else {
    console.log('Note title taken');
}

}
else if (command === 'list') {
    var allnotes= notes.getAll();
    console.log(`Printing ${allnotes.length} notes`);
    allnotes.forEach((note)=>notes.logNote(note));


} else if (command === 'read') {
    var note = notes.getNote(argv.title);
   if(note){
    console.log('Note found...');
    notes.logNote(note);

   }
   else{
       console.log('Note not found');
   }

} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed': 'There is no such note exits' ;
    console.log(message);
}
else {
	console.log('');
    console.log('Fatal: Command not recognized, please use the commands mentioned above');
}
