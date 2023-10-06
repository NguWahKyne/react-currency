import React,{useEffect,useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';
import {CgArrowsExchangeAlt} from 'react-icons/cg'

const apiUrl = 'http://api.exchangeratesapi.io/v1/latest?access_key=f832c1fc5b9ded7a04baccee5c164e47';

function App() {
  const [currencyOptions,setCurrencyOptions]=useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate,setExchangeRate]=useState();

  let toAmount ,fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => { 
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base,...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      }) 
  }, [])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${apiUrl}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  },[fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  

  return (
    <>
    <div className="App boxStyles">
      <div style={{paddingBottom:"10px"}}>
         <h1 > Currency Convert</h1>
      </div>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={fromCurrency} onChangeCurrency={e=>setFromCurrency(e.target.value)} onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
        />
      <div> <CgArrowsExchangeAlt className='icon-sty'/></div>
      <CurrencyRow currencyOptions={currencyOptions} selectedCurrency={toCurrency} onChangeCurrency={e=>setToCurrency(e.target.value)} onChangeAmount={handleToAmountChange}
        amount={toAmount}/>
    </div>
     </>
  )
}

export default App
