import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    amount: "",
    expense_date: "",
    description: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses', error);
      }
    };
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/expenses', newExpense);
      setExpenses([...expenses, response.data]);
      setNewExpense({
        amount: "",
        expense_date: "",
        description: "",
      });
    } catch (error) {
      console.error("Error posting expense", error);
    }
  };

  const handleInputChange = (e) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (expense) => {
    setEditMode(true);
    setCurrentExpense(expense); // Pass expense object instead of 'true'
    setNewExpense({
      amount: expense.amount,
      expense_date: expense.expense_date,
      description: expense.description,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/expenses/${currentExpense.expense_id}`, // Corrected endpoint
        newExpense
      );
      setExpenses(expenses.map(expense => (
        expense.expense_id === currentExpense.expense_id ? response.data : expense
      )));
      setEditMode(false);
      setNewExpense({
        amount: "",
        expense_date: "",
        description: "",
      });
      window.alert("Expense edited");
      setCurrentExpense(null);
    } catch (error) {
      console.error("Error updating expense", error);
    }
  };

  const handleDelete = async (expense_id) => {
    try {
      const acceptDelete = window.confirm("Are you sure you want to delete?");
      if (acceptDelete) {
        await axios.delete(`http://localhost:5000/api/expenses/${expense_id}`);
        setExpenses(expenses.filter(expense => expense.expense_id !== expense_id));
      }
    } catch (error) {
      console.error("Error deleting expense");
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Expenses</h1>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {editMode ? "Edit Expense" : "Add Expense"}
        </h2>
        <form onSubmit={editMode ? handleEditSubmit : handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Expense Date</label>
            <input
              type="date"
              name="expense_date"
              value={newExpense.expense_date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={newExpense.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            {editMode ? "Update Expense" : "Add Expense"}
          </button>
        </form>

        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {expenses.map((expense) => (
              <div key={expense.expense_id} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-lg font-semibold text-gray-700 mb-2">{expense.description}</p>
                <p className="text-2xl font-bold text-blue-500 mb-2">€{expense.amount}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Date: {new Date(expense.expense_date).toLocaleDateString()}
                </p>
           
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditClick(expense)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(expense.expense_id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
 