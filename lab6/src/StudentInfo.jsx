import React from "react";

function StudentInfo(props) {

    const [dataContext, setDataContext] = React.useState({ FullName: '', BirthDate: '1970-01-01', EntryYear: '2019', Faculty: 'ФИТ', Group: '1', Specialization: '', Email: '', Phone: '' });

    const [renderer, setRenderer] = React.useState(null);

    const inputHandler = function (e) {
        let temp = {};
        Object.assign(temp, dataContext);
        delete temp[e.target.id];
        temp[e.target.id] = e.target.value;
        setDataContext(temp);
        console.log(temp);
        //alert(dataContext.BirthDate)
    }

    const submitHandler=function(e){
        e.preventDefault();
        setRenderer(props.render(dataContext));

    }

    return (
        <div>
            <form>
                <div>
                    <div>
                        <label htmlFor="FullName">ФИО</label>
                    </div>
                    <div>
                        <input required id="FullName" type="text" value={dataContext.FullName} onInput={inputHandler} placeholder="ФИО" />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="BirthDate">Дата рождения</label>
                    </div>
                    <div>
                        <input required id="BirthDate" value={dataContext.BirthDate} type="date" onInput={inputHandler} />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="EntryYear">Год поступления</label>
                    </div>
                    <div>
                        <input required id="EntryYear" value={dataContext.EntryYear} onInput={inputHandler} type="number" max={new Date().getFullYear()} min="1970" />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="Faculty" >Факультет</label>
                    </div>
                    <div>
                        <select required value={dataContext.Faculty} id="Faculty" onInput={inputHandler}>
                            <option value="ФИТ">ФИТ</option>
                            <option value="ЛХФ">ЛХФ</option>
                            <option value="ЛИД">ЛИД</option>
                            <option value="ТОВ">ТОВ</option>
                            <option value="ХТИТ">ХТИТ</option>
                            <option value="ПИМ">ПИМ</option>
                            <option value="ИЭФ">ИЭФ</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="Group">Группа</label>
                    </div>
                    <div>
                        <select required value={dataContext.Group} id="Group" onInput={inputHandler}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="Specialization">Специальность</label>
                    </div>
                    <div>
                        <input required value={dataContext.Specialization} onInput={inputHandler} id="Specialization" type="text" placeholder="Специальность" />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="Email">Email</label>
                    </div>
                    <div>
                        <input required value={dataContext.Email} onInput={inputHandler} id="Email" type="text" placeholder="Email" />
                    </div>
                </div>

                <div>
                    <div>
                        <label htmlFor="Phone">Номер телефона</label>
                    </div>
                    <div>
                        <input required value={dataContext.Phone} onInput={inputHandler} id="Phone" type="text" placeholder="Номер Телефона" />
                    </div>
                </div>

                <div>
                    <div>
                        <input type="submit" onClick={submitHandler} value="Отправить" />
                    </div>
                </div>
            </form>

            {renderer}
        </div>
    );
}


export default StudentInfo;