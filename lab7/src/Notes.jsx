import React from "react";
import "./Notes.css"

function Notes(props) {

    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");
    const [notes, setNotes] = React.useState(JSON.parse(JSON.stringify(props.day.notes)));


    const textHandle = function (e) {
        setText(e.target.value);
    }

    const titleHandle = function (e) {
        setTitle(e.target.value);
    }

    const addNote = function () {
        if (!notes.some(note => note.title === title) && title.trim() !== "") {
            let temp = JSON.parse(JSON.stringify(notes));
            temp.push({ title: title, text: text, date: new Date().toLocaleDateString() });
            setNotes(temp);
            notesChanged(temp);
        }else if(title.trim() !== ""){
            let temp = JSON.parse(JSON.stringify(notes));
            let id = temp.findIndex(note => note.title === title);
            temp[id].text = text;
            setNotes(temp);
            notesChanged(temp);
        }
        setText("");
        setTitle("");
    }



    function deleteAll(){
        setNotes([]);
        notesChanged([]);
    }

    function deleteThis(event){
        let thisTitle =  event.target.dataset.title;
        let temp = JSON.parse(JSON.stringify(notes.filter(n=> n.title !== thisTitle)));
        setNotes(temp);
        notesChanged(temp);
    }

    function notesChanged(notes){
        props.notesChanged(notes);
    }

    return (
        <div style={{width: props.width, height: props.height, border: "1px solid black", position: "absolute", padding: 10, borderRadius: 10, zIndex:3, backgroundColor: "white"}} >
            <div>
            {
                    notes.length > 7 ? (
                        <div>
                            У ВАС СЛИШКОМ МНОГО ЗАМЕТОК!
                        </div>
                    ) : null
                }
                <div>
                    <input type="text" onInput={titleHandle} value={title} />
                </div>
                <div>
                    <textarea placeholder="Заметка. Не более 140 символов" value={text} onInput={textHandle} maxLength="140"></textarea>
                </div>
                <div>
                    <input type="button" value="добавить заметку" onClick={addNote} />
                </div>
                <div>
                    <input type="button" value="Удалить все" onClick={deleteAll} />
                </div>
            </div>
            <div className="notesListView">
                {notes.map((note) => (
                    <div className={"note"} style={ notes.indexOf(note)>=7? {backgroundColor:"plum"} : {backgroundColor: "khaki"}} key={note.title + note.date} >
                        <div data-title={note.title} onClick={deleteThis} className="noteTitle">{note.title}</div>
                        <div className="noteText">{note.text}</div>
                        <div className="noteDate">{note.date}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;