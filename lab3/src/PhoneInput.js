import React from "react";
import './PhoneInput.css';

class CountrySelect extends React.Component {
    constructor(props) {
        super(props);
    }

    countryList = [{ country: "Беларусь", code: "+375" },
    { country: "Россия", code: "+7" },
    { country: "Украина", code: "+380" },
    { country: "Польша", code: "+48" },
    { country: "Литва", code: "+370" },
    { country: "Латвия", code: "+371" }]

    onCountrySelect(e) {
        this.props.onSelect(e);
    }

    render() {
        if (this.props.shown === true) {
            return (
                <div className="selectFieldWrapper">
                    <div className="selectField">
                        {this.countryList.map((elem) => {
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
        this.state = { countrySelectionShown: false}
        this.onArrowClick = this.onArrowClick.bind(this);
        this.countrySelect = this.countrySelect.bind(this);
    }

    countrySelect(e) {
        this.setState((prevState, props) => ({
            countrySelectionShown: !prevState.countrySelectionShown,
            selectedCountry: e
        }));
    }

    onArrowClick() {
        this.setState((prevState, props) => ({
            countrySelectionShown: !prevState.countrySelectionShown
        }));
    }

    render() {
        return (
            <div className="controlWrapper">
                <div className="outerInputDiv">
                    <div className="buttonWrapper" onClick={this.onArrowClick}>
                        <div className="arrow">▼</div>
                        {<img className="countryImage" height="20px" src={!!this.state.selectedCountry ?  "img/" + this.state.selectedCountry.country + ".png" : null} alt={!!this.state.selectedCountry ?  "img/" + this.state.selectedCountry.country + ".png" : ""} /> }
                    </div>
                    <input type="text" />
                </div>
                <CountrySelect shown={this.state.countrySelectionShown} onSelect={this.countrySelect} />
            </div>
        );
    }
}

export default PhoneInput;