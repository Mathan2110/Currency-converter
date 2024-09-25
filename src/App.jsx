import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App(){
    const [amt,setAmt]=useState(1);
    const [from_currency,setFrom_currency]=useState("USD")
    const [to_currency,setTo_currency]=useState("INR")
    const [convertedAmt,setConvertedAmt]=useState(null ) 
    const [exchangeAmt,setExchangeAmt]=useState(1)

    useEffect(()=> {
        const getExchangeRate= async()=>{
            try{
                let url=`https://api.exchangerate-api.com/v4/latest/${from_currency}`;
                const response = await axios.get(url);
                console.log(response);
                setConvertedAmt(response.data.rates[to_currency]);
                setExchangeAmt(amt*convertedAmt)
            }catch (error){
                console.error("Error fetching exchange rate:",error);
            }
        };
        getExchangeRate();
    })

    return(
        <>
        <div className="container">
            <div className="image_container">
        <div className="image">
            <img src="./currency.png" alt="Currency" />
        </div>
            </div>
        <h2>Currency converter</h2>
        <div className="amt">
            <label htmlFor="amount">Amount</label>
            <input type="text" id="amount" value={amt} onChange={(e)=>{isNaN(e.target.value)?setAmt(0):setAmt(e.target.value)}}/>
        </div>
        <div className="from_currency">
            <label htmlFor="from_currency_id">From Currency</label>
            <select name="from_currency" id="from_currency_id" value={from_currency} onChange={(e)=>{
                setFrom_currency(e.target.value)}}>
                <option value="USD">USD-United States Doller</option>
                <option value="INR">INR-Indian Rupees</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">British Pound Sterling</option>
                <option value="JPY">Japanese Yen</option>
                <option value="AUD">Austalian Dollar</option>
            </select>
        </div>
        <div className="to_currency">
        <label htmlFor="to_currency_id">To currency
        </label>
            <select name="to_currency" id="to_currency_id"value={to_currency} onChange={(e)=>{
                setTo_currency(e.target.value)
            }} >
            <option value="USD">USD-United States Doller</option>
                <option value="INR">INR-Indian Rupees</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">British Pound Sterling</option>
                <option value="JPY">Japanese Yen</option>
                <option value="AUD">Austalian Dollar</option>
            </select>
        </div>

        <div className="result">
            <p>{amt} {from_currency} is equal to {exchangeAmt} {to_currency}</p>
        </div>
        </div>

        </>
    )
}

export default App;