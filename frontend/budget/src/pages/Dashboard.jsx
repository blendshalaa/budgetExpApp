import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Chart from '../components/Chart'; // Import the ExpenseChart component
import axios from 'axios';

const Dashboard = () => {
    const [budgetData, setBudgetData] = useState(0);
    const [expenseData, setExpenseData] = useState(0);
    const [expenseDetails, setExpenseDetails] = useState([]); // Store detailed expense data

    useEffect(() => {
        const fetchBudgetData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/budgets');
                const totalBudget = response.data.reduce((acc, item) => acc + item.budget_amount, 0);
                setBudgetData(totalBudget);
            } catch (error) {
                console.error("error fetching budget data", error);
            }
        };
        fetchBudgetData();
    }, []);

    useEffect(() => {
        const fetchExpenseData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/expenses');
                const totalExpense = response.data.reduce((acc, item) => acc + item.amount, 0);
                setExpenseData(totalExpense);
                setExpenseDetails(response.data); // Store detailed expenses for the chart
            } catch (error) {
                console.error("error fetching expense data", error);
            }
        };
        fetchExpenseData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Total Budget</h2>
                        <p className="text-3xl">{budgetData}€</p>
                    </div>
                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Total Expenses</h2>
                        <p className="text-3xl">{expenseData}€</p>
                    </div>
                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Remaining Balance</h2>
                        <p className="text-3xl">{budgetData - expenseData}€</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Expense Overview</h2>
                    {/* Render the ExpenseChart with expense details */}
                    <Chart data={expenseDetails} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
