import React, {useState, useEffect } from 'react';
import NoteService from './services/NoteService';
 


// Note Page content
import Note from "./Note";
import UserInput from "./UserInput";

function  NotePage(){

    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const [addedNote, setAddedNote] = useState([]);

    function deleteNote(id) {
        NoteService.deleteNote(id).then((data)=>{


        });
    }

    useEffect(() => {
        NoteService.getNotes().then(data => {
            setAddedNote(data?.notes);
        });
    }, [addedNote])

      return(<div>
        <UserInput
              addedNote={addedNote}
              NoteSetter={setNote}
              Note={note}
              setAddedNote={setAddedNote}
        />
        
        <div className="Device">
       {addedNote.map((noteItem, index) => {
            return (
                <Note
                    key={noteItem._id}
                    id={noteItem._id}
                    title={noteItem.title}
                    content={noteItem.content}
                    onDelete={deleteNote}
                />);

        })
              }</div>
      </div>
          

      );
  }

  export default NotePage;