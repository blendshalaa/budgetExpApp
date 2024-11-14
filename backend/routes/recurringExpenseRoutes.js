const express=require('express');
const router=express.Router();
const recurringExpenseController=require('../controllers/recurringExpenseController');


router.post('/',recurringExpenseController.createRecurringExpense);
router.get('/',recurringExpenseController.getAllRecurringExpenses);
router.get('/:recurring_expense_id',recurringExpenseController.getAllRecurringById);
router.put('/:recurring_expense_id',recurringExpenseController.updateRecurring);
router.delete('/:recurring_expense_id',recurringExpenseController.deleteRec);
module.exports=router;



