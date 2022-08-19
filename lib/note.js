const fs = require('fs');

function getNoteById(id, noteArray) {
  const result = noteArray.filter(note => note.id === id)[];
  return result;
}

function createNewNote(note, noteArray) {
  const note = body;
  noteArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../notes.html'),
  )
}