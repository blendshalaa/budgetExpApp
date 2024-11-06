const Budget = require('../models/Budget');

const createBudget = async (req, res) => {
    try {
        const newBudget = await Budget.create(req.body);
        res.status(201).json(newBudget);
    } catch (error) {
        console.error("Error creating budget:", error);
        res.status(500).json({ message: "Error creating budget", error });
    }
};

const getAllBudgets = async (req, res) => {
   
    try {
        const budgets = await Budget.getAll();
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving budgets", error });
    }
};

const getBudgetById = async (req, res) => {
    const { budget_id } = req.params;
    try {
        const budget = await Budget.getById(budget_id);
        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.status(200).json(budget);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving budget", error });
    }
};

const updateBudget = async (req, res) => {
    const { budget_id } = req.params;
    const { user_id } = req.body; // Assuming user_id is sent in the body
    try {
        const updatedBudget = await Budget.update(budget_id, user_id, req.body);
        if (!updatedBudget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.status(200).json(updatedBudget);
    } catch (error) {
        res.status(500).json({ message: "Error updating budget", error });
    }
};

const deleteBudget = async (req, res) => {
    const { budget_id } = req.params;
    try {
        const deletedBudget = await Budget.deleteBudget(budget_id);
        if (!deletedBudget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.status(200).json({ message: "Budget deleted successfully", deletedBudget });
    } catch (error) {
        res.status(500).json({ message: "Error deleting budget", error });
    }
};

module.exports = {
    createBudget,
    getAllBudgets,
    getBudgetById,
    updateBudget,
    deleteBudget
};
