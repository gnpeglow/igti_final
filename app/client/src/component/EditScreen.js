import React from 'react'
const INSERT =0;
const EDIT=1;
//Tela de Edição/adição, contem todos os campos required 
function now(){
  const date = new Date();
  const year = date.getFullYear();
  const month= (date.getMonth()+1).toString().padStart(2,'0');
  const day= (date.getDate()).toString().padStart(2,'0');
  const now = `${year}-${month}-${day}`
  return now;
}
export default function EditScreen({
    transaction,
    onCancel,
    onSave,
}) {
    const [description, setDescription]= React.useState('');
    const [value, setValue]= React.useState(0);
    const [category, setCategory]= React.useState('');
    const [yearMonthDay, setDate]= React.useState(now());
    const [type, setType]= React.useState('-');
    const [mode, setMode]= React.useState(0)

    React.useEffect(()=>{
        if(!transaction){
            return;
        }
        const {description, value, category, type, yearMonthDay}=transaction;
        setCategory(category);
        setDate(yearMonthDay);
        setType(type);
        setValue(value);
        setDescription(description);
        setMode(EDIT);
    },[transaction])

    const handleDescription = (event)=>{
        const newDescription = event.target.value.trim();
        setDescription(newDescription);
    }
    const handleValue = (event)=>{
        const newValue = Number(event.target.value);
        setValue(newValue);
    }
    const handleCategory= (event)=>{
        const newCategory =event.target.value.trim();
        setCategory(newCategory);
    }
    const handleType= (event)=>{
        const newType =event.target.value;
        setType(newType);
    }
    const handleDate= (event)=>{
        const newDate =event.target.value.trim();
        setDate(newDate);
    }
    const handleCancelClick= ()=>{
        onCancel();
    }
    const handleSaveClick=()=>{
        const newTransaction ={
            _id:!!transaction? transaction._id:null,
            value,
            type,
            yearMonthDay,
            category,
            description,
        };
        onSave(newTransaction);
    }
    

    return (
        <div>
           <p>
            <label>
              <input name="receita_despesa" type="radio" 
              checked={type==='+'}
              onChange={handleType}
              value='+' />
              <span>Receita</span>
            </label>
              </p>
              <p>
            <label>
              <input name="receita_despesa" type="radio" 
              checked={type==='-'}
              onChange={handleType}
              value='-' />
              <span>Despesa</span>
            </label>
    </p>
        <div className="input-field">
          <input value={description} 
          onChange={handleDescription} 
          id="input description" type="text" >
          </input>
          <label htmlFor="Input Description" className='active'>Descrição</label>
        </div>

        <div className="input-field">
          <input  value={value} 
          onChange={handleValue} 
          id="inputValue" type="number" >
          </input>
          <label htmlFor="Input Value" className='active'>Valor</label>
        </div>


        <div className="input-field">
          <input  value={type} 
          onChange={handleType} 
          id="inputType" type="text" >
          </input>
          <label htmlFor="Input Type" className='active'>+/-</label>
        </div>

        <div className="input-field">
          <input  value={yearMonthDay} 
          onChange={handleDate} 
          id="inputDate" type="date" >
          </input>
          <label htmlFor="Input Date" className='active'>dd/mm/yyyy</label>
        </div>


        <button className='waves-effect waves-light btn'
        onClick={handleSaveClick}
        >Salvar</button>


        <button className='waves-effect waves-light btn red'
        style={{marginLeft:'12px'}}
       onClick={handleCancelClick} >Calcelar</button>
      </div>
    )
}
