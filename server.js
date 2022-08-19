const express = require("express");
const app = express();
const path = require("path");
const PORT = 3001;
const fs = require('fs');
const notes = require('./db/db.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"))
});

// Getting a note
app.get('/api/notes', (req, res) => res.json(notes));

// Adding a note
app.post('/api/notes', (req, res) => {
  console.log(req);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      noteId: Math.random() * 1000
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully created notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting review');
  }
});

// Delete a note(extra)

app.listen(PORT, () => {
  console.log("Hey you are on the port!")
});


