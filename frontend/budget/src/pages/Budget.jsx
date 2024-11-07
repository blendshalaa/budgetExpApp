import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from "axios"

function Budget() {
  const[budgets,setBudgets]=useState([]);
  const[newBudget,setNewBudget]=useState({
    budget_amount:"",
    month:"",
    year:""
  });






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


  const handleSubmit=async(e)=>{
    e.preventDefault();

    const budgetObject={
      ...newBudget
    };
    try{
      const response=await axios.post('http://localhost:5000/api/budgets',budgetObject);
      setBudgets(budgets.concat(response.data));
      setNewBudget({   budget_amount:"",
        month:"",
        year:""});
        window.alert('Budget has been added')
    }catch(error){
      console.error("error adding budget",error)
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget({
      ...newBudget,
      [name]: value
    });
  };





const handleDelete=async(budget_id)=>{
  try{
   await axios.delete(`http://localhost:5000/api/budgets/${budget_id}`);
    setBudgets(budgets.filter(budget=>budget.budget_id!==budget_id));
    window.alert("Budget deleted")
  }catch(error){
    console.error("error deleting budget",error)
  }
}


return (
  <div>
    <Navbar />
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Budget</h2>

      {/* Form for adding a new budget */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Budget Amount</label>
          <input
            type="number"
            name="budget_amount"
            value={newBudget.budget_amount}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter budget amount"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Month</label>
          <input
            type="text"
            name="month"
            value={newBudget.month}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter month"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
          <input
            type="text"
            name="year"
            value={newBudget.year}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter year"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Budget
        </button>
      </form>

   
  

      {/* Displaying List of Budgets */}
      <h2 className="text-2xl font-bold mb-4">Budgets</h2>
      <ul>
        {budgets.map(budget => (
          <li key={budget.budget_id} className="p-2 border-b">
            <strong>Amount:</strong> {budget.budget_amount}, 
            <strong> Month:</strong> {budget.month}, 
            <strong> Year:</strong> {budget.year},
            <button
              onClick={() => handleDelete(budget.budget_id)}
              className="ml-4 bg-red-500 text-white py-1 px-2 rounded"
            >
              Delete
            </button>
        
          </li>
       
        ))}
      </ul>
    </div>
  </div>
);
}

export default Budget