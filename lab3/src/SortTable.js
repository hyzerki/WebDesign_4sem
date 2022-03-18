import React from 'react';

class SortTable extends React.Component {
    constructor(props) {
        super(props);
        this.state={tableData: [{ Name: "Молоко", Price: 1.99, Stock: 57 },
        { Name: "Сахар", Price: 4.49, Stock: 21 },
        { Name: "Соль", Price: 3.99, Stock: 22 },
        { Name: "Масло", Price: 3.29, Stock: 37 },
        { Name: "Гречка", Price: 2.69, Stock: 14 },
        { Name: "Макароны", Price: 2.39, Stock: 16 }]}
    }


    onCategoryClick(e){
        this.setState((prevState,props)=>({
            tableData: prevState.tableData.sort((a,b)=>a[e]-b[e])
        }))
    }


    render() {
        let categories = Object.keys(this.state.tableData[0]).map((elem) => {
            return (<td onClick={this.onCategoryClick.bind(this,elem)} key={elem}>{elem}</td>);
        });

        let id = -1;
        let body = this.state.tableData.map((row) => {
            id+=1;
            return (
                <tr key={id}>
                    {Object.keys(row).map((elem) => {
                        return(<td key={elem + row[elem]}>{row[elem]}</td>)
                    })}
                </tr>
            )
        })

        return (
            <table>
                <thead>
                    <tr>{categories}</tr>
                </thead>
                <tbody>
                    {body}
                </tbody>
            </table>
        )
    }
}

export default SortTable;