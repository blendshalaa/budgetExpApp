// src/pages/ExpensesPage.js
import React from 'react';
import Navbar from '../components/Navbar';

const Expenses = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Expenses</h1>

        {/* Add Expense Button */}
        <div className="mb-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add New Expense
          </button>
        </div>

        {/* Filter by Category */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Filter by Category:
          </label>
          <select id="category" className="block w-full px-4 py-2 border border-gray-300 rounded-md">
            <option>All Categories</option>
            <option>Groceries</option>
            <option>Utilities</option>
            <option>Transport</option>
            <option>Entertainment</option>
            <option>Other</option>
          </select>
        </div>

        {/* Expenses List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Expense Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Groceries</h2>
            <p className="text-2xl mb-4">$200</p>
            <p className="text-sm text-gray-500 mb-4">Category: Groceries</p>
            <p className="text-sm text-gray-400 mb-4">Date: 01/01/2024</p>
            <div className="flex justify-between">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>

          {/* Expense Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Utilities</h2>
            <p className="text-2xl mb-4">$150</p>
            <p className="text-sm text-gray-500 mb-4">Category: Utilities</p>
            <p className="text-sm text-gray-400 mb-4">Date: 01/03/2024</p>
            <div className="flex justify-between">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>

          {/* Expense Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Transport</h2>
            <p className="text-2xl mb-4">$80</p>
            <p className="text-sm text-gray-500 mb-4">Category: Transport</p>
            <p className="text-sm text-gray-400 mb-4">Date: 01/05/2024</p>
            <div className="flex justify-between">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>

          {/* Expense Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Entertainment</h2>
            <p className="text-2xl mb-4">$120</p>
            <p className="text-sm text-gray-500 mb-4">Category: Entertainment</p>
            <p className="text-sm text-gray-400 mb-4">Date: 01/07/2024</p>
            <div className="flex justify-between">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
