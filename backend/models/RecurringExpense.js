const pool=require('../db');



const RecurringExpense={
    create:async({category_id,amount,frequency,start_date,end_date})=>{
        const result=await pool.query('INSERT INTO recurring_expenses(category_id,amount,frequency,start_date,end_date) VALUES($1,$2,$3,$4,$5) RETURNING *',
            [category_id ,amount,frequency,start_date,end_date]
        );
        return result.rows[0]
    },
    getAllRecurring:async()=>{
        const result=await pool.query('SELECT * FROM recurring_expenses');
        return result.rows;
    },
    getRecurringById:async(recurring_expense_id)=>{
        const result=await pool.query('SELECT * FROM  recurring_expenses WHERE recurring_expense_id=$1',
            [recurring_expense_id]
        );
        return result.rows[0]
    },
    updateRecurring: async ({ recurring_expense_id, category_id, amount, frequency, start_date, end_date }) => {
        const result = await pool.query(
            `UPDATE recurring_expenses 
             SET category_id = $1, amount = $2, frequency = $3, start_date = $4, end_date = $5
             WHERE recurring_expense_id = $6
             RETURNING *`,
            [category_id, amount, frequency, start_date, end_date, recurring_expense_id]
        );
        return result.rows[0];
    },
    
    deleteRecurringExpense:async(recurring_expense_id)=>{
        const result=await pool.query('DELETE FROM recurring_expenses WHERE recurring_expense_id=$1 RETURNING *',
            [recurring_expense_id]
        );
        return result.rows[0]
    }
   
}

module.exports=RecurringExpense