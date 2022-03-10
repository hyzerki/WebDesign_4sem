import React from "react";

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date(new Date().toUTCString() + (!!props.timezone ? (props.timezone.charAt(0) === "+" ? "-" + props.timezone.substr(1) : "+" + props.timezone.substr(1)) : "")) };
    }

    tick() {
        this.setState({ date: new Date(new Date().toUTCString() + (!!this.props.timezone ? (this.props.timezone.charAt(0) === "+" ? "-" + this.props.timezone.substr(1) : "+" + this.props.timezone.substr(1)) : "")) });
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
            this.tick()
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return <h2>{this.state.date.toLocaleTimeString("ru", { timeZone: "UTC", hour12: this.props.format ==="12"? true: false})}</h2>
    }

}

export default Clock;