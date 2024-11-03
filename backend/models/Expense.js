const pool=require('../db');




const Expense={
    create:async({user_id,category_id,amount,expense_date,description,created_at})=>{
        const result= await pool.query(
            'INSERT INTO expenses (user_id,category_id,amount,expense_date,description,created_at) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
            [user_id,category_id,amount,expense_date,description,created_at]
        );
        return result.rows[0];
    },
    getAllByUser:async(user_id)=>{
        const result= await pool.query('SELECT * FROM expenses where user_id=$1',
            [user_id]
        );
        return result.rows
    },
    getById:async(expense_id)=>{
        const result=await pool.query('SELECT * FROM expenses where expense_id=$1',
            [expense_id]
        );
        return result.rows[0]
    },
    update:async(expense_id,user_id,{category_id,amount,expense_date,description,created_at})=>{
        const result=await pool.query(
            'UPDATE expenses SET category_id =$1,amount=$2,expense_date=$3,description=$4,created_at=$5 RETURNING*',
            [category_id,amount,expense_date,description,created_at]
        );
        return result.rows[0];
    },
    delete:async(expense_id)=>{
        const result =await pool.query('DELETE FROM expenses WHERE expense_id=$1 RETURNING*',
            [expense_id]
        );
        return result.rows[0];
    }
};


module.exports=Expense