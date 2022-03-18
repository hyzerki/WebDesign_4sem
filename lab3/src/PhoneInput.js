import React from "react";
import './PhoneInput.css';

class CountrySelect extends React.Component {
    onCountrySelect(e) {
        this.props.onSelect(e);
    }

    render() {
        if (this.props.shown === true) {
            return (
                <div className="selectFieldWrapper">
                    <div className="selectField">
                        {this.props.countryList.map((elem) => {
                            return (
                                <div className="option" key={elem.code.toString()} onClick={this.onCountrySelect.bind(this, elem)}>
                                    <div className="optionCountry">
                                        {elem.country}
                                    </div>
                                    <div className="optionCode">
                                        {elem.code}
                                    </div>
                                    <div className="optionFlag">
                                        <img src={"img/" + elem.country + ".png"} alt={"img/" + elem.country + ".png"} />
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

class PhoneInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { countrySelectionShown: false, inputValue: "" }
        this.onArrowClick = this.onArrowClick.bind(this);
        this.countrySelect = this.countrySelect.bind(this);
        this.onPhoneInputChanged = this.onPhoneInputChanged.bind(this);
        this.countryClick = this.countryClick.bind(this);
    }

    countryList = [{ country: "Беларусь", code: "+375", pattern: " (XX) XXX-XX-XX" },
    { country: "Россия", code: "+7", pattern: " (XXX) XXX-XX-XX" },
    { country: "Украина", code: "+380", pattern: " (XX) XXX-XX-XX" },
    { country: "Польша", code: "+48", pattern: " XXX-XXX-XXX" },
    { country: "Литва", code: "+370", pattern: " (XX) XXX-XX-XX" },
    { country: "Латвия", code: "+371", pattern: " XXXX-XXXX" }]

    countrySelect(e) {
        this.setState((prevState, props) => ({
            selectedCountry: e,
            inputValue: prevState.inputValue.charAt(0) === "+" ? prevState.inputValue.replace(!!prevState.selectedCountry ? prevState.selectedCountry.code : 0, e.code) : e.code + prevState.inputValue
        }));
    }

    countryClick(e) {
        this.setState((prevState, props) => ({
            countrySelectionShown: !prevState.countrySelectionShown
        }));
        this.countrySelect(e);
    }

    onArrowClick() {
        this.setState((prevState, props) => ({
            countrySelectionShown: !prevState.countrySelectionShown
        }));
    }

    onPhoneInputChanged(e) {
        const checkPattern = !!this.state.selectedCountry ? " " + this.state.selectedCountry.pattern : "";
        let numb = e.target.value.substr(!!this.state.selectedCountry ? this.state.selectedCountry.code.length : 0);
        if (this.state.inputValue < e.target.value) {
            if (checkPattern.charAt(numb.length + 1) !== "X") {
                e.target.value += checkPattern.charAt(numb.length + 1);
            }
        }



        this.setState((prevState, props) => ({
            inputValue: e.target.value
        }));
        //Определяем страну по коду
        let flag = false;
        this.countryList.forEach(element => {
            if (e.target.value.substr(0, element.code.length) === element.code) {
                this.countrySelect(element);
                flag = true;
            }
        });
        if (!flag) {
            this.setState((prevState, props) => ({
                selectedCountry: undefined
            }));
        }
    }

    render() {
        return (
            <div className="controlWrapper">
                <div className="outerInputDiv">
                    <div className="buttonWrapper" onClick={this.onArrowClick}>
                        <div className="arrow">{this.state.countrySelectionShown ? "▲" : "▼"}</div>
                        {!!this.state.selectedCountry ? <img className="countryImage" height="20px" src={"img/" + this.state.selectedCountry.country + ".png"} alt={"img/" + this.state.selectedCountry.country + ".png"} /> : <div className="countryImage"></div>}
                    </div>
                    <input type="text" onInput={this.onPhoneInputChanged} value={this.state.inputValue} />
                </div>
                <CountrySelect countryList={this.countryList} shown={this.state.countrySelectionShown} onSelect={this.countryClick} />
            </div>
        );
    }
}

export default PhoneInput;