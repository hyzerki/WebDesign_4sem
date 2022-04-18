import React from "react";
import "./Calendar.css";

class CalendarHead extends React.Component {
    constructor(props) {
        super(props);
        this.onLeftArrowClick = this.onLeftArrowClick.bind(this);
        this.onRightArrowClick = this.onRightArrowClick.bind(this);
    }

    monthsArray = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Авугст", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];


    onLeftArrowClick() {
        this.props.onLeftArrowClick();
    }

    onRightArrowClick() {
        this.props.onRightArrowClick();
    }

    render() {
        let date = new Date(this.props.date);

        return (
            <thead className="calendarHead">
                <tr>
                    <td onClick={this.onLeftArrowClick} className="calendarArrow">ᐊ</td><td colSpan={5}>{this.monthsArray[date.getMonth()] + " " + date.getFullYear()}</td><td onClick={this.onRightArrowClick} className="calendarArrow">ᐅ</td>
                </tr>
                <tr>
                    <td>Пн</td><td>Вт</td><td>Ср</td><td>Чт</td><td>Пт</td><td>Сб</td><td>Вс</td>
                </tr>
            </thead>
        );
    }
}

class CalendarBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pinnedDates: [] };
    }

    dayMatch(varDate) {
        if (new Date().getDate() === varDate.getDate() && new Date().getFullYear() === varDate.getFullYear() && new Date().getMonth() === varDate.getMonth()) {
            return true
        }
        else { return false }
    }

    pinDay(dateToPin) {
        if (this.isPinned(dateToPin)) {
            this.setState((prevState, props) => ({
                pinnedDates: prevState.pinnedDates.filter(n => n !== dateToPin)
            }));
        } else {
            this.setState((prevState, props) => ({
                pinnedDates: prevState.pinnedDates.concat([dateToPin])
            }));
        }
    }

    isPinned(date) {
        return this.state.pinnedDates.includes(date);
    }

    render() {
        const cols = 7, rows = 6;

        let dateArray = [];

        let varDate = new Date(this.props.date);
        varDate.setHours(0, 0, 0, 0);
        let neededMonth = varDate.getMonth();
        varDate.setDate(0);
        varDate.setDate(varDate.getDate() - varDate.getDay() + 1)

        for (let r = 0; r < rows; r++) {
            dateArray[r] = [];
            for (let c = 0; c < cols; c++) {
                dateArray[r][c] = <td className={this.dayMatch(varDate) ? "today" : (varDate.getMonth() === neededMonth ? "actualMonth" : "secondaryMonth")} key={varDate.toString()} onClick={this.pinDay.bind(this, varDate.toString())}>
                    {this.isPinned(varDate.toString()) ? <span className="pinnedMark"></span> : null}
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
}


class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStr: new Date().toString()
        }
        this.onRightArrowClick = this.onRightArrowClick.bind(this);
        this.onLeftArrowClick = this.onLeftArrowClick.bind(this);
    }

    onRightArrowClick() {
        const newdate = new Date(this.state.dateStr);

        this.setState((prevState, props) => ({
            dateStr: new Date(newdate.getFullYear(), newdate.getMonth() + 1, newdate.getDate()).toString()
        }));
        //dateObj: new Date(prevState.dateObj.getFullYear(), prevState.dateObj.getMonth() - 1, prevState.dateObj.getDate())
    }

    onLeftArrowClick() {
        const newdate = new Date(this.state.dateStr);
        this.setState((prevState, props) => ({
            dateStr: new Date(newdate.getFullYear(), newdate.getMonth() - 1, newdate.getDate()).toString()
        }));
    }

    render() {
        return (
            <table>
                <CalendarHead date={this.state.dateStr} onLeftArrowClick={this.onLeftArrowClick} onRightArrowClick={this.onRightArrowClick} />
                <CalendarBody date={this.state.dateStr} />
            </table>

        );
    }
}

export default Calendar;