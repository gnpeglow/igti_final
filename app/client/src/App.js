import React from 'react';
import axios from 'axios';
import ListGen from './component/ListGen';
import EditScreen from './component/EditScreen';
const LIST_SCREEN=0;
const EDIT_SCREEN=1;
const api = axios.create({baseURL: 'api'});
const PERIODS =[
  '2019-01',
  '2019-02',
  '2019-03',
  '2019-04',
  '2019-05',
  '2019-06',
  '2019-07',
  '2019-08',
  '2019-09',
  '2019-10',
  '2019-11',
  '2019-12',
  '2020-01',
  '2020-02',
  '2020-03',
  '2020-04',
  '2020-05',
  '2020-06',
  '2020-07',
  '2020-08',
  '2020-09',
  '2020-10',
  '2020-11',
  '2020-12',
  '2021-01',
  '2021-02',
  '2021-03',
  '2021-04',
  '2021-05',
  '2021-06',
  '2021-07',
  '2021-08',
  '2021-09',
  '2021-10',
  '2021-11',
  '2021-12',
]


export default function App() {
  const [transactions, setTransactions]= React.useState([]);
  const [currentScreen, setCurrentScreen]= React.useState([LIST_SCREEN]);
  const [filteredTransactions, setFilteredTransactions]= React.useState([]);
  const [currentPeriod, setcurrentPeriod]= React.useState(PERIODS[0]);
  const[filterText,setFilter]=React.useState('');
  const[selectedTransaction,setSelectedTransaction]=React.useState(null);
  const[newTransaction,setNewTransaction]= React.useState(false);
  const [currentSum, setSum]= React.useState(null);

  React.useEffect(()=>{
    const fetchTransactions = async ()=>{
      const {data}= await api.get(`/transaction?period=${currentPeriod}`);
      console.log(data);

      setTransactions(data.transactions)
    };
    fetchTransactions();
  },[currentPeriod]);

  React.useEffect(()=>{
    let newFilter = [...transactions];
    if(filterText.trim()!==''){
      newFilter=newFilter.filter((transaction)=>{
        return transaction.description.includes(filterText);
      })
    }
    setFilteredTransactions(newFilter)
  },[transactions,filterText])

React.useEffect(()=>{
const newScreen = (selectedTransaction !== null || newTransaction) ? EDIT_SCREEN: LIST_SCREEN;
setCurrentScreen(newScreen);
},[selectedTransaction, newTransaction])

React.useEffect(()=>{
  const currentSum =()=>{
    const totalTransactions = filteredTransactions.length;
    
    // soma ganhos
    const earnings= filteredTransactions.filter
    ((transaction)=>transaction.type==='+').reduce
    ((earnings, transaction)=>{
      return earnings + transaction.value;
    },0);

    //soma despesas
    const costs = filteredTransactions.filter(
      (transaction)=>transaction.type==='-').reduce(
        (costs, transaction)=>{
      return costs + transaction.value;
    },0);
    const result = earnings - costs;

    setSum({
      totalTransactions,
      earnings,
      costs,
      result,
    });
  };

  currentSum();
},[filteredTransactions])


//handlers  
const handlePeriodChange = (event)=>{
  const newPeriod = event.target.value;
  setcurrentPeriod(newPeriod);
}

const handleCancel = ()=>{
  setNewTransaction(false);
  setSelectedTransaction(null);
}
const handleSave = async (newTransaction)=>{
  console.log(newTransaction);
  const {_id}= newTransaction;
  if(!_id){
    const insertTransaction ={
      ...newTransaction,
      year:Number(newTransaction.yearMonthDay.substring(0, 4)),
      month:Number(newTransaction.yearMonthDay.substring(5, 7)),
      day:Number(newTransaction.yearMonthDay.substring(8, 10)),
    }
    const {data}= await api.post(`transaction/`,insertTransaction);
    const newTransactions=[...transactions, data.transaction];
    newTransactions.sort((a,b)=>
    a.yearMonthDay.localeCompare(b.yearMonthDay));
    setTransactions(newTransactions);
    setNewTransaction(false);
    
  }else{
      const completeTransaction ={
        ...newTransaction,
        year:Number(newTransaction.yearMonthDay.substring(0, 4)),
        month:Number(newTransaction.yearMonthDay.substring(5, 7)),
        day:Number(newTransaction.yearMonthDay.substring(8, 10)),
      
      }
      await api.put(`transaction/${_id}`,completeTransaction);
      const newTransactions = [...transactions];
      const index = newTransactions.findIndex(transaction =>{
        return transaction._id===completeTransaction._id;
      });
      newTransactions[index]= completeTransaction;
      setTransactions(newTransactions);
      setSelectedTransaction(null);
    }
 
}

const handleNewTransaction= async(event)=>{
  setNewTransaction(true);
}


const handleFilter = (event)=>{
  const inputText= event.target.value.trim();
  setFilter(inputText.toLowerCase());
}


const handleEdit = async (event)=>{
  const id = event.target.id;
  const newSelectedTransaction = filteredTransactions.find((transaction)=>{
    return transaction._id===id;
  })
  setSelectedTransaction(newSelectedTransaction);
}

const handleDeleteTransaction= async (event)=>{
  const id =event.target.id;
 await api.delete(`/transaction/${id}`)
 const newTransactions = transactions.filter((transaction)=>{
   return transaction._id!==id;
 })
 setTransactions(newTransactions);
};



  return( <div className='container'>
    <h1 className='center'>Organizador Pessoal de Despesas</h1>
        {currentScreen===LIST_SCREEN ?(
        <ListGen transactions={filteredTransactions}
        periods={PERIODS} 
        onDeleteTransaction ={handleDeleteTransaction}
        filterText={filterText}
        onFilterChange={handleFilter}
        onPeriodChange={handlePeriodChange}
        currentPeriod={currentPeriod}
        onEditTransaction={handleEdit}
        onNewTransaction={handleNewTransaction}
        total={currentSum}
    />
  ) :(
    <EditScreen
    transaction={selectedTransaction}
    onCancel={handleCancel}
    onSave={handleSave} />
  )}
    </div>
   ) ;
}
