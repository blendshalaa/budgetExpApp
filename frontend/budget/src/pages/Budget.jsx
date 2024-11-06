import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios"

function Budget() {
  const[budgets,setBudgets]=useState([]);



  useEffect(()=>{
    const fetchBudget=async()=>{
     try{
      const response=await axios.get('http://localhost:5000/api/budgets');
      setBudgets(response.data)
     }catch(error){
      console.error("error fetching",error)
     }
    };
    fetchBudget()
  },[]);





  return (
    <div>
      <Navbar/>
      <ul>
        {budgets.map(budget=>(
          <li key={budget.budget_id}>{budget.budget_amount} {budget.month} {budget.year}</li>
        ))}
      </ul>
    </div>
  )
}

export default Budget