import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from "axios";

function Budget() {
  const [budgets, setBudgets] = useState([]);

  const [newBudget, setNewBudget] = useState({
    budget_amount: "",
    month: "",
    year: "",
  });
  const [editMode, setEditMode] = useState(false); // Track if we are in edit mode
  const [currentBudget, setCurrentBudget] = useState(null); // Track the budget being edited

  // Fetch budgets from the API
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/budgets');
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets", error);
      }
    };
    fetchBudget();
  }, []);

  // Handle submit for new budget creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/budgets', newBudget);
      setBudgets([...budgets, response.data]); // Add the new budget to the list
      setNewBudget({
        budget_amount: "",
        month: "",
        year: "",
      });
    } catch (error) {
      console.error("Error adding budget", error);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setNewBudget({
      ...newBudget,
      [e.target.name]: e.target.value,
    });
  };

  // Handle edit button click
  const handleEditClick = (budget) => {
    setEditMode(true);
    setCurrentBudget(budget); // Set the current budget to be edited
    setNewBudget({
      budget_amount: budget.budget_amount,
      month: budget.month,
      year: budget.year,
    });
  };

  // Handle updating the budget
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/budgets/${currentBudget.budget_id}`, newBudget);
      setBudgets(budgets.map(budget => (budget.budget_id === currentBudget.budget_id ? response.data : budget)));
      setEditMode(false); // Exit edit mode
      setNewBudget({
        budget_amount: "",
        month: "",
        year: "",
      });
      window.alert("budget edited")
      setCurrentBudget(null);
    } catch (error) {
      console.error("Error updating budget", error);
    }
  };


  const handleDelete = async (budget_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/budgets/${budget_id}`);
      setBudgets(budgets.filter(budget => budget.budget_id !== budget_id)); // Remove the deleted budget from the list
    } catch (error) {
      console.error("Error deleting budget", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg mt-10">
        <form onSubmit={editMode ? handleEditSubmit : handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Budget Amount</label>
            <input
              type="number"
              name="budget_amount"
              value={newBudget.budget_amount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Month</label>
            <input
              type="number"
              name="month"
              value={newBudget.month}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Year</label>
            <input
              type="number"
              name="year"
              value={newBudget.year}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">
            {editMode ? "Update Budget" : "Add Budget"}
          </button>
        </form>
      </div>

      <div className="mt-10 max-w-lg mx-auto">
        <ul className="space-y-4">
          {budgets.map((budget) => (
            <li key={budget.budget_id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <div>
                <div className="font-semibold text-lg">{budget.budget_amount}</div>
                <div className="text-gray-500 text-sm">{budget.month}/{budget.year}</div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditClick(budget)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(budget.budget_id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Budget;
