const express = require('express');
const router = express.Router();
const expenseController=require('../controllers/expenseController');

router.post('/',expenseController.createExpense);

router.get('/user/:user_id',expenseController.getExpenseUser);

router.get('/:expense_id',expenseController.getExpenseById);

router.put('/:expense_id',expenseController.updateExpense);

router.delete('/:expense_id',expenseController.deleteExpense);

module.exports=router