import React from "react";
import "./Calendar.css";
import Notes from "./Notes";

function CalendarHead(props) {
    const monthsNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Авугст", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    const onLeftArrowClick = function () {
        props.onLeftArrowClick();
    }

    const onRightArrowClick = function () {
        props.onRightArrowClick();
    }

    return (
        <thead className="calendarHead">
            <tr>
                <td onClick={onLeftArrowClick} className="calendarArrow">ᐊ</td><td colSpan={5}>{monthsNames[props.date.getMonth()] + " " + props.date.getFullYear()}</td><td onClick={onRightArrowClick} className="calendarArrow">ᐅ</td>
            </tr>
            <tr>
                <td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td>
            </tr>
        </thead>
    );
}


function CalendarBody(props) {
    const [notedDates, setNotedDates] = React.useState([]);
    const [selectedDay, setSelectedDay] = React.useState({});
    const [notesShown, setNotesShown] = React.useState(false);
    const cols = 7, rows = 6;

    /*const pinDay = function (event) {
        let date = event.target.dataset.date
        if (isPinned(date)) {
            setNotedDates((notedDates.filter(n => n !== date)));
        } else {
            setNotedDates((notedDates.concat([date])));
        }
        console.log(notedDates);
    }*/

    function selectDay(event) {
        let date = event.target.dataset.date;
        let noteObj = notedDates.find(d=> d.date === date);
        if(noteObj === undefined){
            noteObj = {date: date, notes: []};
            console.log(1);
        }
        console.log(noteObj);
        setSelectedDay(noteObj);
        setNotesShown(false);
    }

    const dayMatch = function (varDate) {
        if (new Date().getDate() === varDate.getDate() && new Date().getFullYear() === varDate.getFullYear() && new Date().getMonth() === varDate.getMonth()) {
            return true
        }
        else { return false }
    }


    function isSelected(varDate) {
        let date = varDate.toLocaleDateString();
        if (selectedDay.date === date) {
            return true;
        }
        else {
            return false;
        }
    }

    /*const isPinned = function (date) {
        return notedDates.some(d=> d.date === date);
    }*/

    function openNote(event) {
        setNotesShown(true);
    }

    function notesChanged(notes){
        let not = {date: selectedDay.date,notes: JSON.parse(JSON.stringify(notes))};
        let otherNoted = notedDates.filter(d => d.date !== not.date);
        setSelectedDay(not);
        if(not.notes.length !==0)
        otherNoted.push(not)
        let toAdd = JSON.parse(JSON.stringify(otherNoted));
        setNotedDates(toAdd);
    }

    let dateArray = [];
    let varDate = new Date(props.date);
    varDate.setHours(0, 0, 0, 0);
    let neededMonth = varDate.getMonth();
    varDate.setDate(0);
    varDate.setDate(varDate.getDate() - varDate.getDay() + 1)

    for (let r = 0; r < rows; r++) {
        dateArray[r] = [];
        for (let c = 0; c < cols; c++) {
            dateArray[r][c] = <td className={isSelected(varDate) ? "selectedDay" : (dayMatch(varDate) ? "today" : (varDate.getMonth() === neededMonth ? "actualMonth" : "secondaryMonth"))} key={varDate.toLocaleDateString()} data-date={varDate.toLocaleDateString()} onClick={isSelected(varDate)? openNote : selectDay} onDoubleClick={openNote} >
                {varDate.getDate()}
                {notedDates.find(n=>n.date === varDate.toLocaleDateString()) ? <span className="pinnedMark"></span> : null}
                {isSelected(varDate)? (notesShown? props.render(selectedDay,notesChanged) : null) : null}
            </td>;
            varDate.setDate(varDate.getDate() + 1);
        }
    }
    let weekKey = 0;
    return (
        <React.Fragment>
            <tbody className="calendarBody">
                {dateArray.map((week) => {
                    weekKey++;
                    return (<tr key={weekKey}>
                        {week.map((day) => {
                            return (
                                day
                            )
                        })}
                    </tr>)
                })}
            </tbody>
        </React.Fragment>
    );
}


function Calendar(props) {
    const [date, setDate] = React.useState(new Date());

    const onRightArrowClick = function () {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
    }

    const onLeftArrowClick = function () {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
    }

    return (
        <table>
            <CalendarHead date={date} onLeftArrowClick={onLeftArrowClick} onRightArrowClick={onRightArrowClick} />
            <CalendarBody date={date} render={ (day, notesChanged) => (
                <Notes day={day} notesChanged={notesChanged}/>
            )}/>
        </table>

    );
}

export default Calendar;