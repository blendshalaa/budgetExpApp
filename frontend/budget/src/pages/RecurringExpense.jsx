import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function RecurringExpense() {
  const [recurringExpense, setRecurringExpense] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const [newRecurringExpense, setNewRecurringExpense] = useState({
    amount: "",
    frequency: "",
    start_date: "",
    end_date: "",
    category_id: "", 
  });

  const [editMode, setEditMode] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await axios.get(
          `http://localhost:5000/api/recurring_expenses`
        );
        const categoriesResponse = await axios.get(
          `http://localhost:5000/api/categories`
        );
        setRecurringExpense(expensesResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/api/recurring_expenses`,
        newRecurringExpense
      );
      setRecurringExpense([...recurringExpense, response.data]);
      setNewRecurringExpense({
        amount: "",
        frequency: "",
        start_date: "",
        end_date: "",
        category_id: "",
      });
    } catch (error) {
      console.error("Error creating recurring expense", error);
    }
  };

  const handleEditClick = (recurringExpense) => {
    setEditMode(true);
    setCurrentData(recurringExpense);
    setNewRecurringExpense({
      amount: recurringExpense.amount,
      frequency: recurringExpense.frequency,
      start_date: recurringExpense.start_date,
      end_date: recurringExpense.end_date,
      category_id: recurringExpense.category_id || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/recurring_expenses/${currentData.recurring_expense_id}`,
        newRecurringExpense
      );
      setRecurringExpense(
        recurringExpense.map((rec) =>
          rec.recurring_expense_id === currentData.recurring_expense_id
            ? response.data
            : rec
        )
      );
      setEditMode(false);
      setNewRecurringExpense({
        amount: "",
        frequency: "",
        start_date: "",
        end_date: "",
        category_id: "",
      });
      setCurrentData(null);
    } catch (error) {
      console.error("Error updating recurring expense", error);
    }
  };

  const handleDelete = async (recurring_expense_id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this recurring expense?"
      );
      if (confirmDelete) {
        await axios.delete(
          `http://localhost:5000/api/recurring_expenses/${recurring_expense_id}`
        );
        setRecurringExpense(
          recurringExpense.filter(
            (rec) => rec.recurring_expense_id !== recurring_expense_id
          )
        );
      }
    } catch (error) {
      console.error("Error deleting recurring expense", error);
    }
  };

  const handleInputChange = (e) => {
    setNewRecurringExpense({
      ...newRecurringExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredExpenses =
    selectedCategory === ""
      ? recurringExpense
      : recurringExpense.filter(
          (rec) => rec.category_id === parseInt(selectedCategory)
        );

        return (
          <div className="bg-orange-50 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold mb-6 text-gray-800">Recurring Expenses</h1>
              <form onSubmit={editMode ? handleEditSubmit : handleSubmit} className="space-y-4">
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={newRecurringExpense.amount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Frequency</label>
                  <select
                    name="frequency"
                    value={newRecurringExpense.frequency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled>Select frequency</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={newRecurringExpense.start_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={newRecurringExpense.end_date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Category</label>
                  <select
                    name="category_id"
                    value={newRecurringExpense.category_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" disabled>Select category</option>
                    {categories.map((category) => (
                      <option key={category.category_id} value={category.category_id}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  {editMode ? "Update Expense" : "Add Expense"}
                </button>
              </form>
        
              {filteredExpenses.length === 0 ? (
                <p className="text-gray-500 mt-6">No recurring expenses found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                  {filteredExpenses.map((rec) => (
                    <div key={rec.recurring_expense_id} className="bg-white p-6 rounded-lg shadow-md">
                      <p className="text-lg font-semibold text-gray-700 mb-2">Frequency: {rec.frequency}</p>
                      <p className="text-2xl font-bold text-blue-500 mb-2">€{rec.amount}</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Start Date: {new Date(rec.start_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        End Date: {new Date(rec.end_date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Category:{" "}
                        {
                          categories.find(
                            (category) => category.category_id === rec.category_id
                          )?.category_name
                        }
                      </p>
                      <div className="flex justify-between mt-4">
                        <button
                          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                          onClick={() => handleEditClick(rec)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:underline"
                          onClick={() => handleDelete(rec.recurring_expense_id)}
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


export default RecurringExpense;
