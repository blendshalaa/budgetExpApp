const Expense=require('../models/Expense');


const createExpense=async(req,res)=>{
    try{
        const newExpense=await Expense.create(req.body);
        res.status(201).json(newExpense)
    }catch(error){
        console.error("error creating expense",error);
        res.status(500).json({message:"error creating expense",error})
    }
};

const getExpenseUser=async(req,res)=>{
    const {user_id}=req.params;
    try{
        const expenseUser=await Expense.getAllByUser(user_id);
        res.status(201).json(expenseUser)
    }catch(error){
        console.error("error getting expense by user",error);
        res.status(500).json({message:"error getting expense by user",error})
    }
}

const getExpenseById=async(req,res)=>{
    const {expense_id}=req.params;
    try{
        const expense=await Expense.getById(expense_id);
        if(!expense){
            return res.status(404).json({message:"expense not found"})
        }
        res.status(200).json(expense);
    }catch(error){
        console.error("error getting expense by id",error);
        res.status(500).json({message:"error geting expense by id",error})
    }
};


const updateExpense=async(req,res)=>{
    const{expense_id}=req.params;
    try{
        const updatedExpense=await Expense.update(expense_id,req.body);
        if(!updatedExpense){
            return res.status(404).json({message:"expense not found"})
        }
        res.status(200).json(updatedExpense)
    }catch(error){
        console.error("error updating expense by ",error);
        res.status(500).json({message:"error gupdating",error})
    }
}


const deleteExpense=async(req,res)=>{
    const{expense_id}=req.params;
    try{
        const deletedExpense=await Expense.delete(expense_id);
        if(!deletedExpense){
            return res.status(404).json({message:"expense not found"})
        }
        res.status(200).json(deletedExpense)
    }catch(error){
        console.error("error deleting by id",error);
        res.status(500).json({message:"error deleting",error})
    }
}

module.exports={
    createExpense,
    getExpenseUser,
    getExpenseById,
    updateExpense,
    deleteExpense

}