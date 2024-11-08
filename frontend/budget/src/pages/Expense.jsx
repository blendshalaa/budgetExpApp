// src/pages/ExpensesPage.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Expenses</h1>

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
                <p className="text-sm text-gray-400">Added: {new Date(expense.created_at).toLocaleDateString()}</p>
                <div className="flex justify-between mt-4">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline">Delete</button>
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
