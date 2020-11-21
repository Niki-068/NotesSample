const notes = require("./notes");
const yargs = require("yargs");
const chalk = require("chalk");


// command to add a new note
yargs.command({
    command:'add',
    describe:'add a new note',
    builder:{
        title:  {
            describe:'note title',
            demandOption:true,
            type:'string'
        },
        body:{
            describe:"note body",
            demandOption:true,
            type:'string'
        }
    },
    handler (argv){
       console.log(notes.addNotes(argv.title,argv.body));
    }
})

//command to remove a note
yargs.command({
    command:'remove',
    describe:'Remove the note',
    builder : {
        title : {
            describe: "note title to remove",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        console.log(chalk.green.inverse(notes.removeNotes(argv.title)));
    }
})

//command to list notes
yargs.command({
    command:'list',
    describe:'list all notes',
    handler(){
       notes.listNotes();
    }
})

//command to read all notes
yargs.command({
    command:'read',
    describe:'read a note',
    builder:{
        title:{
            describe : "title of the note to read",
            demandOption:true,
            type:'string'
        }
    },
    handler(argv){
        notes.getNotes(argv.title);      
    }
})

yargs.parse();   

