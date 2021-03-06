import React from "react";
import PhoneInput from "./PhoneInput.js";
import PropTypes from 'prop-types';

function SignUpEmailInput(props) {
    const [emailValue, setEmailValue] = React.useState("");

    const emailInputHandler = function(e){
        setEmailValue(e.target.value);
        props.getEmailValid(new RegExp(/^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/).test(e.target.value));
        console.log(new RegExp(/^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/).test(e.target.value));
    }

    return (
        <div style={{ width: "200px" }}>
            <div>
                <label>
                    Email
                </label>
            </div>
            <div>
                <input style={{ width: "100%" }} type="email" value={emailValue} onInput={emailInputHandler}/>
            </div>
        </div>
    )
}

SignUpEmailInput.propTypes= {getEmailValid: PropTypes.func
};

function SignUpPasswordInput(props) {
    const [passwordValue, setPasswordValue] = React.useState("");
    const [passwordRepeatValue, setPasswordRepeatValue] = React.useState("");
    const [progressValue, setProgressValue] = React.useState(0);

    //setUpper

    const passwordInput = function (e) {
        setPasswordValue(e.target.value);
        validatePassword(e.target.value);
        comparePasswords(e.target.value, passwordRepeatValue);
    }

    const passwordRepeatInput = function (e) {
        setPasswordRepeatValue(e.target.value);
        comparePasswords(passwordValue, e.target.value);
    }

    const comparePasswords = function (str1, str2) {
        if (str1.length < 6 || str2.length < 6) {
            props.getPasswordMatch(false);
            console.log(false);
        } else {
            props.getPasswordMatch(str1 === str2);
            console.log(str1 === str2);
        }
    }

    const validatePassword = function (e) {
        let res = 0;
        let capReg = new RegExp(/(?=.*[A-Z])/);
        let lowReg = new RegExp(/(?=.*[a-z])/);
        let numReg = new RegExp(/(?=.*[0-9])/);
        let specReg = new RegExp(/(?=.*[!@#$%^&*])/);
        if (capReg.test(e)) {
            res += 20;
        }
        if (lowReg.test(e)) {
            res += 20;
        }
        if (numReg.test(e)) {
            res += 20;
        }
        if (specReg.test(e)) {
            res += 20;
        }
        if (e.length >= 6) {
            res += 20;
        }
        setProgressValue(res);
        return res;
    }

    return (
        <div style={{ width: "200px" }}>
            <div>
                <label>
                    ????????????
                </label>
            </div>
            <div>
                <input style={{ width: "100%" }} type="password" value={passwordValue} onInput={passwordInput} />
            </div>
            <div>
                <label>
                    ?????????????????????? ????????????
                </label>
            </div>
            <div>
                <input style={{ width: "100%" }} type="password" value={passwordRepeatValue} onInput={passwordRepeatInput} />
            </div>
            <div>
                <progress style={{ width: "100%" }} max={100} value={progressValue} />
            </div>
        </div>
    )
}

SignUpPasswordInput.propTypes= {getEmailValid: PropTypes.func
};

function SignUpForm() {
    const [passwordValid, setPasswordValid] = React.useState(false);
    const [emailValid, setEmailValid] = React.useState(false);


    return (
        <form>
            <SignUpEmailInput  getEmailValid={setEmailValid}/>
            <SignUpPasswordInput getPasswordMatch={setPasswordValid} />
            <div>
                <div>
                    <label>
                        ??????
                    </label>
                </div>
                <div>
                    <input type="text" />
                </div>
            </div>
            <div>
                <div>
                    <label>
                        ??????????????
                    </label>
                </div>
                <div>
                    <input type="text" />
                </div>
            </div>
            <div>
                <div>
                    <label>
                        ????????????????
                    </label>
                </div>
                <div>
                    <input type="text" />
                </div>
            </div>
            <div>
                <div>
                    <label>
                        ????????????????
                    </label>
                </div>
                <div>
                    <input type="radio" name="gender" value="male" />??????????????
                    <input type="radio" name="gender" value="female" />??????????????????
                </div>
            </div>
            <div>
                <div>
                    <label>
                        ???????? ????????????????
                    </label>
                </div>
                <div>
                    <select>
                        <option>01</option>
                    </select>
                    <select>
                        <option>01</option>
                    </select>
                    <select>
                        <option>2001</option>
                    </select>
                </div>
            </div>
            <PhoneInput />
            {emailValid && passwordValid ? <input type="submit" value="??????????????????" /> : <input type="submit" value="??????????????????" disabled />}
        </form>
    )
}

export default SignUpForm;