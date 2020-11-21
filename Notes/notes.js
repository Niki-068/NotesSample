const fs = require("fs");
const chalk = require("chalk");
//get Notes utility function
const getNotesUtil = (title)=>{
    
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);

    if(!note){
        console.log(chalk.red.inverse("Note with title not found"));
    }
    else{
        console.log(chalk.italic.inverse( note.title));
        console.log(note.body);
    }

}

//Add new note only if the title does not already exists
const addNotesUtil = (title,body)=>{
    const notes = loadNotes();

    const duplicateNote = notes.find((note)=> note.title === title);

    if(!duplicateNote){

        notes.push({
            title:title,
            body:body
        });

        saveNotes(notes);
        return "New Note saved";
    }
    else{
        return "Note title already taken";
    }

}

const listNoteUtil = () => {
    const notesList= loadNotes();
       console.log(chalk.yellow.inverse("List of all Notes"));

       notesList.forEach(note => {
           console.log(chalk.green.inverse(note.title + " || " + note.body))
       });
}

const saveNotes = (notes) => {
    fs.writeFileSync("notes.json",JSON.stringify(notes))
}

const loadNotes = ()=>{

    try{

        const notesJSON = fs.readFileSync("notes.json").toString();
        const notesObj = JSON.parse(notesJSON);
        return notesObj;
    }
    catch(e){
        return [];
    }
}

const removeNotesUtil = (title)=>{
    const notes = loadNotes();

    const remainingNotes = notes.filter((note)=>note.title !== title);

    if(notes.length === remainingNotes.length){
        return "Oops,No note with " + title + " found!";
    }
    else{
        saveNotes(remainingNotes);
        return "Removed note with " + title ;
    }
}
module.exports = {
    getNotes : getNotesUtil,
    addNotes : addNotesUtil,
    removeNotes : removeNotesUtil,
    listNotes : listNoteUtil
}