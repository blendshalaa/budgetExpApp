const pool=require('../db')


const Category={
    create:async({category_name,description})=>{
        const result=await pool.query(
            'INSERT into categories (category_name,description) VALUES($1,$2)RETURNING *',
            [category_name,description]
        );
        return result.rows[0]
    },
    getAll:async()=>{
        const result=await pool.query('SELECT * FROM categories');
        return result.rows
    },
    getById:async(category_id)=>{
        const result=await pool.query('SELECT * FROM categories where category_id=$1',
            [category_id]
        );
        return result.rows[0]
    },
    update: async (budget_id, { category_id, budget_amount, month, year }) => {
        const result = await pool.query(
            'UPDATE budgets SET category_id = $1, budget_amount = $2, month = $3, year = $4 WHERE budget_id = $5 RETURNING *',
            [category_id, budget_amount, month, year, budget_id]
        );
        return result.rows[0];
    },
    
    delete:async(category_id)=>{
        const result=await pool.query('DELETE FROM categories WHERE category_id=$1 RETURNING *',
            [category_id]
        );
        return result.rows[0]
    }
   
}

module.exports=Category