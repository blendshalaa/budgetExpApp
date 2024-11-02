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
    updateCategory:async(category_id,{category_name,description})=>{
        const result=await pool.query(
            'UPDATE categories SET name = $1, description = $2 WHERE category_id = $3 RETURNING *',
            [category_name,description,category_id]
        );
        return result.rows[0]
    },
    deleteCategory:async(category_id)=>{
        const result=await pool.query('DELETE FROM categories WHERE category_id=$1 RETURNING *',
            [category_id]
        );
        return result.rows[0]
    }
   
}

module.exports=Category