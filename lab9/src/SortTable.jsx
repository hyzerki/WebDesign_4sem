import React from "react";
import './SortTable.css';


function Catalog(props) {
    function sortByName() {
        props.sortByName();
    }

    function sortByPrice() {
        props.sortByPrice();
    }

    function sortByStock() {
        props.sortByStock();
    }

    function sortByDiscount() {
        props.sortByDiscount();
    }

    return (
        <div>
            <div>
                <input type="button" onClick={sortByName} value="Названию" />
                <input type="button" onClick={sortByPrice} value="Цене" />
                <input type="button" onClick={sortByStock} value="Количеству" />
                <input type="button" onClick={sortByDiscount} value="Скидке" />
            </div>
            <div>
                {props.tableData.map(element => (
                    <div style={{ display: "flex" }}>
                        <div>
                            {element.isNew ? <div>НОВИНКА!</div> : null}
                            <img height="200px" src={"images/" + element.image} alt={"images/" + element.image} />
                        </div >
                        <div>
                            <div>{element.name}</div>
                            <div>{element.discount !== 0 ? <span style={{ textDecoration: "line-through" }}> {element.price * (1 - element.discount)} </span> : null}  {element.price}</div>
                            <div>Количество: {element.stock}</div>
                            <div>{element.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SortTable(props) {
    const [tableData, setTableData] = React.useState([{ name: "Модные часы", price: 24999.99, stock: 53, image: "1.jpg", description: "для богатых и тупых", isNew: false, discount: 0 },
    { name: "Military vibe watch", price: 49.99, stock: 241, image: "2.jpg", description: "Если любите по утрам запах напалма", isNew: false, discount: 15 },
    { name: "Casio silver watch", price: 49.99, stock: 531, image: "3.jpg", description: "Нестареющая классика", isNew: true, discount: 0 },
    { name: "Розовые часы", price: 249.99, stock: 7, image: "4.jpg", description: "Розовые смарт-часы", isNew: false, discount: 0 },
    { name: "Gay Watch 5 LGBTQUAIENWRYOPSDFZXC+ EDITION", price: 349, stock: 74, image: "5.jpg", description: "Часы для прогрессивных и не таких как все. Для фантастических тварей из твиттера и прочих не идентифицирующих себя как \"нормис\"", isNew: true, discount: 0 }])

    const [sortOrder, setSortOrder] = React.useState(true);

    function sortByName() {
        let temp = JSON.parse(JSON.stringify(tableData));
        temp.sort((a, b) => a.name.localeCompare(b.name));
        if (sortOrder)
            temp.reverse();
        setTableData(temp);
        setSortOrder(!sortOrder);
    }

    function sortByPrice() {
        let temp = JSON.parse(JSON.stringify(tableData));
        temp.sort((a, b) => a.price - b.price);
        if (sortOrder)
            temp.reverse();
        setTableData(temp);
        setSortOrder(!sortOrder);
    }

    function sortByStock() {
        let temp = JSON.parse(JSON.stringify(tableData));
        temp.sort((a, b) => a.stock - b.stock);
        if (sortOrder)
            temp.reverse();
        setTableData(temp);
        setSortOrder(!sortOrder);
    }

    function sortByDiscount() {
        let temp = JSON.parse(JSON.stringify(tableData));
        temp.sort((a, b) => a.discount - b.discount);
        if (sortOrder)
            temp.reverse();
        setTableData(temp);
        setSortOrder(!sortOrder);
    }



    let body = tableData.map(element => (
        <tr key={element.name}>
            <td>{element.name}</td><td>{element.price}</td><td>{element.stock}</td><td><img className="image" src={"images/" + element.image} alt={"images/" + element.image} /></td><td>{element.description}</td><td>{element.isNew ? "Новинка" : ""}</td><td>{element.discount + "%"}</td>
        </tr>
    ));


    return (
        <React.Fragment>
            <table className="sortTable">
                <thead>
                    <tr>
                        <td onClick={sortByName}>Название</td><td onClick={sortByPrice}>Цена</td><td onClick={sortByStock}>Количество</td><td>Изображение</td><td>Описание</td><td>Новинка</td><td onClick={sortByDiscount}>Скидка</td>
                    </tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
            <Catalog tableData={tableData} sortByName={sortByName} sortByStock={sortByStock} sortByPrice={sortByPrice} sortByDiscount={sortByDiscount}/>
        </React.Fragment>
    )
}

export default SortTable;