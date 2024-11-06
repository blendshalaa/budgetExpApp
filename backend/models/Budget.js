const pool = require('../db');

const Budget = {
    create: async ({ user_id, category_id, budget_amount, month, year }) => {
        const result = await pool.query(
            'INSERT INTO budgets (user_id, category_id, budget_amount, month, year) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user_id, category_id, budget_amount, month, year]
        );
        return result.rows[0];
    },

    getAll: async () => {
        const result = await pool.query('SELECT * FROM budgets');
        return result.rows;
    },

    getById: async (budget_id) => {
        const result = await pool.query(
            'SELECT * FROM budgets WHERE budget_id = $1',
            [budget_id]
        );
        return result.rows[0];
    },

    update: async (budget_id, user_id, { category_id, budget_amount, month, year }) => {
        const result = await pool.query(
            'UPDATE budgets SET category_id = $1, budget_amount = $2, month = $3, year = $4 WHERE budget_id = $5 AND user_id = $6 RETURNING *',
            [category_id, budget_amount, month, year, budget_id, user_id]
        );
        return result.rows[0];
    },

    deleteBudget: async (budget_id) => {
        const result = await pool.query(
            'DELETE FROM budgets WHERE budget_id = $1 RETURNING *',
            [budget_id]
        );
        return result.rows[0];
    }
};

module.exports = Budget;
