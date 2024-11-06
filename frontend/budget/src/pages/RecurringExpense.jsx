// src/pages/RecurringExpensesPage.js
import React from 'react';
import Navbar from '../components/Navbar';

const RecurringExpensesPage = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Recurring Expenses</h1>

        {/* Add Recurring Expense Button */}
        <div className="mb-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Add New Recurring Expense
          </button>
        </div>

        {/* Filter by Category or Frequency */}
        <div className="mb-6">
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Filter by Category:
          </label>
          <select id="category" className="block w-full px-4 py-2 border border-gray-300 rounded-md mb-4">
            <option>All Categories</option>
            <option>Rent</option>
            <option>Utilities</option>
            <option>Subscriptions</option>
            <option>Insurance</option>
          </select>

          <label htmlFor="frequency" className="block text-sm font-medium mb-2">
            Filter by Frequency:
          </label>
          <select id="frequency" className="block w-full px-4 py-2 border border-gray-300 rounded-md">
            <option>All Frequencies</option>
            <option>Monthly</option>
            <option>Yearly</option>
            <option>Quarterly</option>
          </select>
        </div>

        {/* Recurring Expenses List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Recurring Expense Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Rent</h2>
            <p className="text-2xl mb-4">$1200</p>
            <p className="text-sm text-gray-500 mb-4">Category: Rent</p>
            <p className="text-sm text-gray-400 mb-4">Frequency: Monthly</p>
            <p className="text-sm text-gray-400 mb-4">Next Due Date: 01/15/2024</p>
            <div className="flex justify-between">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>

          {/* Recurring Expense Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Netflix Subscription</h2>
            <p className="text-2xl mb-4">$15</p>
            <p className="text-sm text-gray-500 mb-4">Category: Subscriptions</p>
            <p className="text-sm text-gray-400 mb-4">Frequency: Monthly</p>
            <p className="text-sm text-gray-400 mb-4">Next Due Date: 01/10/2024</p>
            <div className="flex justify-between">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>

          {/* Recurring Expense Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Car Insurance</h2>
            <p className="text-2xl mb-4">$500</p>
            <p className="text-sm text-gray-500 mb-4">Category: Insurance</p>
            <p className="text-sm text-gray-400 mb-4">Frequency: Yearly</p>
            <p className="text-sm text-gray-400 mb-4">Next Due Date: 03/01/2024</p>
            <div className="flex justify-between">
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>

          {/* Recurring Expense Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Gym Membership</h2>
            <p className="text-2xl mb-4">$30</p>
            <p className="text-sm text-gray-500 mb-4">Category: Subscriptions</p>
            <p className="text-sm text-gray-400 mb-4">Frequency: Monthly</p>
            <p className="text-sm text-gray-400 mb-4">Next Due Date: 02/01/2024</p>
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

export default RecurringExpensesPage;
