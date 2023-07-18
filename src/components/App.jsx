import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

let preData = [];



function App() {
  const [notes, setNotes] = useState([]);
 
  function addNote(newNote) {
    
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function start() {
    axios.post("http://localhost:5000/data").then(res => {
      preData = res.data;
      setNotes(preData);
    });
  }
  
  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  
  return (
    <div>
      <Header />
     
      <CreateArea onAdd={addNote} onStart={start} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            onUpdate={start}
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          />
          );
        })}
      <Footer />
    </div>
  );
}



export default App;
