import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

function RecurringExpense() {

const[recurringExpense,setRecurringExpense]=useState([]);
const[newRecurringExpense,setNewRecurringExpense]=useState({
  amount:"",
  frequency:"",
  start_date:"",
  end_date:""
});
const [editMode,setEditMode]=useState(false);
const[currentData,setCurrentData]=useState(null);



useEffect(()=>{
  const fetchRecExpenses=async()=>{
    try{
      const response=await axios.get(`http://localhost:5000/api/recurring_expenses`);
      setRecurringExpense(response.data)
    }catch(error){
      console.error("error fetching recurring expenses",error)
    }
  };
  fetchRecExpenses();
},[]);




  
  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar/>
      <div>
        <ul>
      {recurringExpense.map((rec)=>(
        <li key={rec.recurring_expense_id}>{rec.amount},{rec.frequency} {rec.start_date} {rec.end_date}</li>
      ))}
        </ul>


      </div>
    </div>
  )
}

export default RecurringExpense;

