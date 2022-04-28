import React from "react";
import "./Calendar.css";

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
    const cols = 7, rows = 6;

    const pinDay = function(event) {
        let date = event.target.dataset.date
        if (isPinned(date)) {
            setNotedDates((notedDates.filter(n => n !== date)));
        } else {
            setNotedDates((notedDates.concat([date])));
        }
        console.log(notedDates);
    }

    const dayMatch = function(varDate) {
        if (new Date().getDate() === varDate.getDate() && new Date().getFullYear() === varDate.getFullYear() && new Date().getMonth() === varDate.getMonth()) {
            return true
        }
        else { return false }
    }

    const isPinned = function(date) {
        return notedDates.includes(date);
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
            dateArray[r][c] = <td className={dayMatch(varDate) ? "today" : (varDate.getMonth() === neededMonth ? "actualMonth" : "secondaryMonth")} key={varDate.toLocaleDateString()} data-date={varDate.toLocaleDateString()} onClick={pinDay}>
                {isPinned(varDate.toLocaleDateString()) ? <span className="pinnedMark"></span> : null}
                {varDate.getDate()}
            </td>;
            varDate.setDate(varDate.getDate() + 1);
        }
    }
    let weekKey = 0;
    return (
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
            <CalendarBody date={date} />
        </table>

    );
}

export default Calendar;