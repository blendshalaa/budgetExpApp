const RecurringExpense=require('../models/RecurringExpense');

const createRecurringExpense=async(req,res)=>{
    try{
        const newRecurringExpense=await RecurringExpense.create(req.body);
        res.status(201).json(newRecurringExpense)
    }catch(error){
        console.error("error creating recurringexpense",error);
        res.status(500).json({message:"Error creating recexpense",error})
    }
};


const getAllRecurringExpenses=async(req,res)=>{
    try{
        const recurringexpenses=await RecurringExpense.getAllRecurring(req.body);
        res.status(200).json(recurringexpenses)
    }catch(error){
        console.error("error getting all recuringexpenses",error);
        res.status(500).json({message:"error getting all recuingexpenes",error})
    }
};


const getAllRecurringById=async(req,res)=>{
    const{recurring_expense_id}=req.params;
    try{
        const getRecById=await RecurringExpense.getRecurringById(recurring_expense_id);
       if(!getRecById){
        return res.status(404).json({message:"recurring expense not found"})
       }
       res.status(200).json(getRecById)
    }catch(error){
        console.error("error geting all recurings by id",error);
        res.status(500).json({message:"error geting all recuring by id",error});
    }
};

const updateRecurring = async (req, res) => {
    const { recurring_expense_id } = req.params;
    const { category_id, amount, frequency, start_date, end_date } = req.body;

    try {
        const updatedRec = await RecurringExpense.updateRecurring({
            recurring_expense_id,
            category_id,
            amount,
            frequency,
            start_date,
            end_date,
        });

        if (!updatedRec) {
            return res.status(404).json({ message: "Recurring expense not found to update" });
        }

        res.status(200).json(updatedRec);
    } catch (error) {
        console.error("Error updating recurring expense:", error);
        res.status(500).json({ message: "Error updating recurring expense", error });
    }
};


const deleteRec=async(req,res)=>{
const{recurring_expense_id}=req.params;
try{
    const deletedRec=await RecurringExpense.deleteRecurringExpense(recurring_expense_id);
    if(!deletedRec){
        return res.status(404).json({message:"recuringexpense cant be found to be deleted"});
    };
    res.status(200).json(deletedRec)
}catch(error){
    console.error("error deleting",error);
    res.status(500).json({message:"error deleting expenses",error})
}
}

module.exports={
    createRecurringExpense,
    getAllRecurringExpenses,
    getAllRecurringById,
    updateRecurring,
    deleteRec
}