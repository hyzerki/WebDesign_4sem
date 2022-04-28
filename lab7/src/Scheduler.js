import React from "react";
import Calendar from "./Calendar";
import Notes from "./Notes";

function Scheduler(props){
    const [selectedDay, setSelectedDay] = React.useState(null);


    return(
        <div>
            <Calendar selectedDayChanged={setSelectedDay}/>
        </div>
    );
}

export default Scheduler;