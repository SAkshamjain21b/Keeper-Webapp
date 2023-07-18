import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import RedoIcon from '@material-ui/icons/Redo';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from "axios";


function Note(props) {

  const [isChange, setforChanged] = useState(false);
  const [newData, setNewData] = useState({
    newName:"",
    newContent:""
  }); 
  const [updated, setUpdated] = useState(false);





  function handleClick() {
    props.onDelete(props.id);
    axios.post("http://localhost:5000/delete", props);

  }

  function redoClick(event) {
    setforChanged(() => {
      return (!isChange);
    }); 
  }
  
  function newNote(event) {
    setNewData({ newName: props.title, newContent: event.target.value });
    setUpdated(true);
    
  }
  
  function updateNote() {
    axios.post("http://localhost:5000/update", newData);  
    props.onUpdate();
    props.onUpdate();
    setforChanged(false);
    setUpdated(false);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      {isChange && <textarea name="newNote" id="noteTextarea" value={updated ?(newData.newContent):""} onChange={newNote} placeholder="Please Enter New Text"></textarea>}
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button>
        <RedoIcon onClick={redoClick} />
      </button>
      <button>
        <AddCircleIcon onClick={updateNote}/>
      </button>
    </div>
  );
}

export default Note;
