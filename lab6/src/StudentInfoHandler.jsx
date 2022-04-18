import React from "react";

function StudentInfoHandler(props) {
    const dataContext = props.dataContext;

    const age = new Date(new Date() - new Date(dataContext.BirthDate)).getFullYear()-1970;
    const course = new Date().getFullYear()-parseInt(dataContext.EntryYear);
    const faculty = `${dataContext.Faculty}, ${course<=4? course: "выпустился"} , ${dataContext.Group}`;
    const mailOperator = dataContext.Email.substr(dataContext.Email.indexOf("@")+1);

    let phoneOperator="";
    if(new RegExp(/^((\+37529|8029)(1|3|6|9)(\d){6})|((\+37544|8044)(\d){7})$/).test(dataContext.Phone))
    {
        phoneOperator = "A1(velcom)";
    }
    if(new RegExp(/^((\+37529|8029)(2|5|7|8)(\d){6})|((\+37533|8033)(\d){7})$/).test(dataContext.Phone))
    {
        phoneOperator = "МТС";
    }
    if(new RegExp(/^(\+37525|8025)(\d){7}$/).test(dataContext.Phone))
    {
        phoneOperator = "life:)";
    }
    if(new RegExp(/^(\+37517|8017)(\d){7}$/).test(dataContext.Phone))
    {
        phoneOperator = "Белтелеком(городской)";
    }


    
    return (
        <table>
            <tbody>
                <tr>
                    <td>ФИО</td><td>{dataContext.FullName}</td>
                </tr>
                <tr>
                    <td>текущий возраст студента</td><td>{age}</td>
                </tr>
                <tr>
                    <td>факультет, курс, группа</td><td>{faculty}</td>
                </tr>
                <tr>
                    <td>специальность</td><td>{dataContext.Specialization}</td>
                </tr>
                <tr>
                    <td>электронная почта</td><td>{dataContext.Email}</td>
                </tr>
                <tr>
                    <td>оператор услуг электронной почты</td><td>{mailOperator}</td>
                </tr>
                <tr>
                    <td>номер телефона</td><td>{dataContext.Phone}</td>
                </tr>
                <tr>
                    <td>оператора услуг мобильной связи</td><td>{phoneOperator}</td>
                </tr>
            </tbody>
        </table>
    );

}

export default StudentInfoHandler;