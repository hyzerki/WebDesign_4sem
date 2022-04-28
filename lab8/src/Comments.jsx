import React from "react";
import './Comments.css'






function CommentInfo(props) {
    const [isShown, setShown] = React.useState(false);
    let date = new Date(props.comment.timestamp);

    function showClicked() {
        setShown(!isShown);
    }

    return (
        <span>
            <input type="button" onClick={showClicked} value="Инфо" />
            {isShown ?
                <div style={{ position: "absolute", zIndex: 2, backgroundColor: "white", border: "1px solid black" }}>
                    <div>
                        {props.comment.name}
                    </div>
                    <div>
                        {props.comment.email}
                    </div>
                    <div>
                        {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
                    </div>
                </div> : null}
        </span>
    );
}

function CommentDelete(props) {
    const [isShown, setShown] = React.useState(false);
    const [secret, setSecret] = React.useState("");

    function secretChanged(e) {
        setSecret(e.target.value)
    }

    function showClicked() {
        setShown(!isShown);
    }

    function tryDelete() {
        if (secret === props.comment.secret) {
            props.onDelete(props.comment);
        }
        setSecret("");
    }

    return (
        <span>
            <input type="button" onClick={showClicked} value="Удалить" />
            {isShown ?
                <div style={{ position: "absolute", zIndex: 2, backgroundColor: "white", border: "1px solid black" }}>
                    <div>
                        Секрет?
                    </div>
                    <div>
                        <input value={secret} onChange={secretChanged} type="password" />
                    </div>
                    <div>
                        <input type="button" value="Удалить" onClick={tryDelete} />
                    </div>
                </div> : null}
        </span>
    );
}

function CommentEdit(props) {
    const [isShown, setShown] = React.useState(false);
    const [text, setText] = React.useState("");
    const [secret, setSecret] = React.useState("");


    function textChanged(e) {
        setText(e.target.value)
    }

    function secretChanged(e) {
        setSecret(e.target.value)
    }

    function showClicked() {
        setShown(!isShown);
    }

    function tryEdit() {
        if (secret === props.comment.secret) {
            props.onEdit(props.comment, text);
            setText("");
        }
        setSecret("");
    }

    return (
        <span>
            <input type="button" onClick={showClicked} value="Изменить" />
            {isShown ?
                <div style={{ position: "absolute", zIndex: 2, backgroundColor: "white", border: "1px solid black" }}>
                    <div>
                        Редактировать Комментарий
                    </div>
                    <div>
                        <input value={text} onChange={textChanged} type="text" />
                    </div>
                    <div>
                        Секрет
                    </div>
                    <div>
                        <input value={secret} onChange={secretChanged} type="password" />
                    </div>
                    <div>
                        <input type="button" value="Изменить" onClick={tryEdit} />
                    </div>
                </div> : null}
        </span>
    );
}

function Comments(props) {
    const nameField = React.useRef(null);
    const emailField = React.useRef(null);
    const textField = React.useRef(null);
    const secretField = React.useRef(null);

    const [avatar, setAvatar] = React.useState("images/Overpovered.jpg");

    const [comments, setComments] = React.useState([]);

    function onSubmit(event) {
        event.preventDefault();
        let coms = JSON.parse(JSON.stringify(comments));
        coms.push({
            timestamp: Date.now(),
            name: nameField.current.value,
            avatar: avatar,
            email: emailField.current.value,
            text: textField.current.value,
            secret: secretField.current.value
        });
        setComments(coms);
    }

    function onAvatarChange(event) {
        setAvatar(event.target.value);
    }

    function deleteComment(comment) {
        let temp = comments.filter(c => c.timestamp !== comment.timestamp && c.text !== comment.text && c.name !== comment.name);
        setComments(temp);
    }

    function editComment(comment, text){
        let coms = JSON.parse(JSON.stringify(comments));
        let index = coms.findIndex(c => c.timestamp === comment.timestamp && c.text === comment.text && c.name === comment.name);
        coms[index].text = text;
        coms[index].timestamp = Date.now();
        setComments(coms); 
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <div>
                        <label>Имя пользователя</label>
                    </div>
                    <div>
                        <input ref={nameField} type="text" />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Аватар</label>
                    </div>
                    <div>
                        <select onChange={onAvatarChange} value={avatar}>
                            <option value="images/Overpovered.jpg">Сильный чел</option>
                            <option value="images/Eurobeat.jpg">Любитель владельцев старой тойоты</option>
                            <option value="images/Depressed.jpg">Не закрыл аттестацию</option>
                            <option value="images/General.jpg">Генерал муд</option>
                            <option value="images/Admiral.png">Адмирал муд</option>
                        </select>
                    </div>
                    <div>
                        <img height="200px" src={avatar} alt={avatar}></img>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Почта</label>
                    </div>
                    <div>
                        <input ref={emailField} type="text" />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Сообщение</label>
                    </div>
                    <div>
                        <input ref={textField} type="text" />
                    </div>
                </div>
                <div>
                    <div>
                        <label>Секрет</label>
                    </div>
                    <div>
                        <input ref={secretField} type="password" />
                    </div>
                </div>
                <input type="submit" />
            </form>
            <div className="commentSection">
                {comments.map((comment) => (
                    <div key={comment.timestamp} className="comment">
                        <div style={{ display: "flex" }} className="commentTop">
                            <div><img height="50px" width="50px" className="commentAvatar" src={comment.avatar} alt={comment.avatar} /></div>
                            <div className="commentName">{comment.name}</div>
                        </div>
                        <div>{comment.text}</div>
                        <div>
                            <CommentInfo comment={comment} />
                            <CommentDelete comment={comment} onDelete={deleteComment} />
                            <CommentEdit comment={comment} onEdit={editComment} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comments;