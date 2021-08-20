import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import NoteService from './services/NoteService';

function UserInput({ addedNote, setAddedNote, Note, NoteSetter}) {
    const [isclicked, setIsClicked] = useState(false);
    // const [message, setMessage] = useState(null)

    function submitNote(e) {
        e.preventDefault();
        NoteService.postNote(Note).then(data => {
            const { message } = data;

            resetForm();
            if (!message.msgError) {
                NoteService.getNotes().then(getData => {
                    setAddedNote(getData?.notes);

                });}
            else if(message.msgError){
                alert(message.msgBody)
                
            }
           
        })

        setIsClicked(false);

    }

    function handleChange(event) {
        const { name, value } = event.target;

        NoteSetter((prevNote) => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }


    const resetForm =()=>{
        NoteSetter({title:"", content:""});
    }



    
    

    return (
        <div>
            <form onSubmit={submitNote} method="post"className="create-note">
                {isclicked === true && (
                    <zoom in={true}>
                        <input
                            name="title"
                            onChange={handleChange}
                            value={Note.title}
                            placeholder="Title"
                            required="true"
                            
                        />
                    </zoom>
                )}

                <Zoom in={true}>
                    <textarea
                        name="content"
                        required
                        onChange={handleChange}
                        value={Note.content}
                        onClick={() => {
                            setIsClicked(true);
                        }}
                        placeholder="Take a note..."
                        rows={isclicked ? "3" : "1"}
                        
                    />
                </Zoom>

                {isclicked && (
                    <Zoom in={true}>
                        <Fab onClick={
                            submitNote
                            }>
                            <AddIcon  fontSize="large"/>
                        </Fab>
                    </Zoom>
                )}
            </form>
        </div>
    );
}

export default UserInput;
