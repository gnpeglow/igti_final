import React from 'react'
const PLUS_COLOR='#ecf0f1';
const MINUS_COLOR='#c0392b';
export default function ListGen({transactions,
    periods,
    currentPeriod, 
    onDeleteTransaction,
    filterText,
    onNewTransaction,
    onPeriodChange,
    onFilterChange,
    total,
}) {
    const{transactionStyle,buttonStyle}= styles;

    return (
        <div>
        <select className="browser-default" value={currentPeriod} onChange={onPeriodChange}>
        {periods.map(periods=>{
    return<option key ={periods}>{periods}</option>
  })}
</select>
<input type="text" 
placeholder="Informe descrição" 
value ={filterText} 
onChange={onFilterChange}
style={{marginTop: '15px', marginBottom:'15px'}}>
</input>
<div class="row">
        <div class="input">
          <input disabled value={total.result} id="disabled" type="number" class="validate"></input>
          <label for="disabled">Saldo do mes</label>
        </div>
      </div>
    <div class="row">
        <div class="input">
          <input disabled value={total.costs} id="disabled" type="number" class="validate"></input>
          <label for="disabled">Despesas do Mes</label>
        </div>
      </div>
      <div class="row">
        <div class="input">
          <input disabled value={total.earnings} id="disabled" type="number" class="validate"></input>
          <label for="disabled">Ganhos do Mes</label>
        </div>
      </div>


  <div>
    
    <button className='waves-effect waves-ligth btn'
    style={{marginTop: '15px', marginBottom:'15px'}}
    onClick={onNewTransaction}
    >Adicionar</button>
  </div>

    {transactions.map((transaction) =>{// Listagem para o periodo selecionado
    const setColor = transaction.type === '+' ? PLUS_COLOR:MINUS_COLOR
      return <p key={transaction._id} style={{...transactionStyle,backgroundColor:setColor}}> 
        <span style={buttonStyle}>
          <button className='waves-effect waves-light btn'
          onClick={onNewTransaction}
          id={transaction._id}>
            EDITAR
          </button>
          <button className='waves-effect waves-light btn red '
          onClick={onDeleteTransaction}
          id={transaction._id}>
            X
          </button>
          </span>
        {transaction.yearMonthDay} -
        <strong>{transaction.category}-{" "}</strong>{transaction.description} -{" "}
        {transaction.value}
        </p>; 
      })}
  </div>
   );
}
const styles ={
    transactionStyle:{
      padding: '5px',
      margin: '5px',
      border: '1px solid black',
      borderRadius: '5px',
    },
    buttonStyle:{
      margin:'5px',
    }
  }
