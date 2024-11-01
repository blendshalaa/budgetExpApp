const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/BudgetController');

// Route to create a new budget
router.post('/', budgetController.createBudget);

// Route to get all budgets for a specific user
router.get('/user/:user_id', budgetController.getAllBudgetsByUser);

// Route to get a budget by its ID
router.get('/:budget_id', budgetController.getBudgetById);

// Route to update a budget
router.put('/:budget_id', budgetController.updateBudget);

// Route to delete a budget
router.delete('/:budget_id', budgetController.deleteBudget);

module.exports = router;
