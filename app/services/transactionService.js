const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const TransactionModel = require('../models/TransactionModel');
const transactionRouter = require('../routes/routes');

async function getTransactionFrom(period){
    const transaction = await TransactionModel.find({yearMonth:period});
    return transaction
}

async function postTransaction(transaction){
    const transactionMDB = await TransactionModel.create(transaction);
    return transactionMDB;
}

async function updateTransaction(_id, transaction){
    await TransactionModel.updateOne({_id:ObjectId(_id)},transaction)
    return {_id, ...transaction};
}
async function deleteTransaction(_id){/// arrumar delete
    const result = await TransactionModel.deleteOne({_id:ObjectId(_id)})
    return result.deletedCount===1;

}
module.exports ={
    getTransactionFrom,
    postTransaction,
    updateTransaction,
    deleteTransaction,
}