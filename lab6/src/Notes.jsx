import React from "react";

function Notes(props) {
    const [notes, setNotes] = React.useState([]);

    const [title, setTitle] = React.useState("");
    const [text, setText] = React.useState("");

    const textHandle = function (e) {
        setText(e.target.value);
    }

    const titleHandle = function (e) {
        setTitle(e.target.value);
    }

    const addNote = function () {
        if (!notes.some(note => note.title === title) && title.trim() !== "") {
            let temp = notes.slice();
            temp.push({ title: title, text: text, date: new Date() });
            setNotes(temp);
            setText("");
            setTitle("");
        }
    }

    const deleteFirstHandle = function () {
        let temp = notes.slice();
        temp.shift();
        setNotes(temp);
    }

    const deleteLastHandle = function () {
        let temp = notes.slice();
        temp.pop();
        setNotes(temp);
    }

    return (
        <div style={{width: props.width, height: props.height, border: "1px solid black", padding: 10, borderRadius: 10}} >
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
                {
                    notes.length > 3 ? (
                        <div>
                            <input type="button" onClick={deleteFirstHandle} value="Удалить первую" />
                            <input type="button" onClick={deleteLastHandle} value="Удалить последнюю" />
                        </div>
                    ) : null
                }
            </div>
            <div className="notesListView">
                {notes.map((note) => (
                    <div className={"note"} style={ notes.indexOf(note)>=7? {backgroundColor:"plum"} : {backgroundColor: "khaki"}} key={note.title + note.date.toLocaleDateString()}>
                        <div className="noteTitle">{note.title}</div>
                        <div className="noteText">{note.text}</div>
                        <div className="noteDate">{note.date.toLocaleDateString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;