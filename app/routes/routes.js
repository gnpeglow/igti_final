const { response, query } = require('express');
const express = require('express');
const transactionRouter = express.Router();

service = require('../services/transactionService');
// getter
transactionRouter.get('/', async(request, response)=>{
    const{query}= request;
    try{
        if(!query.period){
            throw new Error('Campo Obrigatorio "period" yyyy-mm Faltando');
        }

        const {period}= query; 
        //aqui vai ser validado se periodo tem o tamanho certo

        if(period.length!==7){
            throw new Error('Tamanho inadequado para "period');
        }

        const filteredTransactions = await service.getTransactionFrom(period);

        response.send({length:filteredTransactions.length, transactions: filteredTransactions});
    }
    catch({message}){
        console.log(message);
        response.status(400).send({error:message});
    }
})


transactionRouter.post('/', async(request, response)=>{
    const{body}= request;
    try{
        if(JSON.stringify(body)==='{}'){
            throw new Error('no ecxiste');
        }

        const {description, value, category, year, month, day, type}= body
        const yearMonth= `${year}-${month.toString().padStart(2,0)}`;
        const yearMonthDay= `${yearMonth}-${day.toString().padStart(2,0)}`;
        const postTransaction ={
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type
        }

        const newTransaction = await service.postTransaction(postTransaction);
        await service.postTransaction(postTransaction);
        response.send({
            status:'Ok',transaction: newTransaction,
        });
    }
    catch({message}){
        console.log(message);
        response.status(400).send({error:message});
    }
})
transactionRouter.put('/:id', async(request, response)=>{
    const{body,params}= request;
    try{
        if(JSON.stringify(body)==='{}'){
            throw new Error('no ecxiste');
        }

        const {description, value, category, year, month, day, type}= body
        const yearMonth= `${year}-${month.toString().padStart(2,0)}`;
        const{id}= params;
        const yearMonthDay= `${yearMonth}-${day.toString().padStart(2,0)}`;
        const updateTransaction ={
            description,
            value,
            category,
            year,
            month,
            day,
            yearMonth,
            yearMonthDay,
            type,
        }

        const updatedTransaction = await service.updateTransaction(id, updateTransaction);
        response.send({
            status:'Ok',
            transaction: updatedTransaction,
        });
    }
    catch({message}){
        console.log(message);
        response.status(400).send({error:message});
    }
})
transactionRouter.put('/', async(request, response)=>{
    try{
        throw new Error('no ecxiste');
    }
    catch({message}){
        console.log(message);
        response.status(400).send({error:message});
    }
})

transactionRouter.delete('/', async(request, response)=>{
    try{
        throw new Error('no ecxiste');
    }
    catch({message}){
        console.log(message);
        response.status(400).send({error:message});
    }
})

transactionRouter.delete('/:id', async(request, response)=>{
    const{params}= request;
    
    try{
        const {id} =params;
        const deleted= await service.deleteTransaction(id);
        if (deleted){
            response.send({
                status:'Ok',
                mensage: `id: ${id} removido com sucesso`,
            });
        }else{
            throw new Error("Falha na exclusão");
        }
    }
    catch({message}){
        console.log(message);
        response.status(400).send({error:message});
    }
})

module.exports = transactionRouter;
