import logo from './logo.svg';
import './App.css';
import { getElementError } from '@testing-library/react';

var json = [{
  stock_name: "EFX",
  company_name: "Equifax Inc",
  price: 163.55,
  currency: "USD",
  change: "+9.03"
}, {
  stock_name: "IRM",
  company_name: "Iron Mountain Inc",
  price: 33.21,
  currency: "USD",
  change: "+1.42"
}, {
  stock_name: "NTAP",
  company_name: "NetApp Inc",
  price: 54.81,
  currency: "USD",
  change: "-6.01"
}, {
  stock_name: "CTL",
  company_name: "Centurylink Inc",
  price: 13.79,
  currency: "USD",
  change: "-1.37"
}];

function App() {
  return (
    <div>
      <h1>{new Date().toLocaleDateString()}</h1>
      <Currency json={json} />
      <Checkmates />
    </div>

  );
}

function Currency(props) {
  var posChange = {color: '#00ff00'};
  var negChange = {color: '#ff0000'};
  let body = [];
  for (let i = 0; i < props.json.length; i++) {
    body[i] = <tr>
      <td>{props.json[i].company_name}</td><td>{props.json[i].stock_name}</td><td>{props.json[i].price}</td><td style={props.json[i].change >= 0 ? posChange : negChange}>{props.json[i].change}</td><td>{props.json[i].currency}</td>
    </tr>
  }
  return (

    <table className='currency' cellspacing="0">
      <tr>
        <td >Название</td><td>Тикер</td><td>Цена</td><td>Изменение</td><td>Валюта</td>
      </tr>
      {body}
    </table>
  );
}

function Annotations(){
  let annotations = [];
  const ahLeters = "abcdefgh";
  for (let i = 0; i < 10; i++) {
    annotations[i] = <td>{ahLeters.charAt(i - 1)}</td>;
  }
  return<tr>{annotations}</tr>;
}


function Checkmates() {
  let board = [];
  let whiteFirst = true;
  for(let i =0; i<8;i++){
    board[i]=
    <tr>
      <td>{8-i}</td><td className={whiteFirst? "white":"black"}></td><td className={!whiteFirst? "white":"black"}></td><td className={whiteFirst? "white":"black"}></td><td className={!whiteFirst? "white":"black"}></td><td className={whiteFirst? "white":"black"}></td><td className={!whiteFirst? "white":"black"}></td><td className={whiteFirst? "white":"black"}></td><td className={!whiteFirst? "white":"black"}></td><td>{8-i}</td>
    </tr>;
    whiteFirst=!whiteFirst;
  }
  return <table cellspacing="0px" className='checkerBoard'>
    <Annotations/>
    {board}
    <Annotations/>
  </table>
}




export default App;
