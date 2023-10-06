import React from 'react'
import './CurrencyRow.css'

export default  function CurrencyRow(props) {
const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
    } = props;

  return (
    <div>
      <input type="number" className="input-sty" value={amount} onChange={onChangeAmount} />
      <select className='txt-sty' style={{marginLeft:"3px"}} value={selectedCurrency} onChange={onChangeCurrency} >
        {currencyOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
