import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Chart from '../components/Chart'; 
import axios from 'axios';

const Dashboard = () => {
    const [budgetData, setBudgetData] = useState(0);
    const [expenseData, setExpenseData] = useState(0);
    const [expenseDetails, setExpenseDetails] = useState([]); 

    useEffect(() => {
        const fetchBudgetData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/budgets');
                const totalBudget = response.data.reduce((acc, item) => acc + item.budget_amount, 0);
                setBudgetData(totalBudget);
            } catch (error) {
                console.error('Error fetching budget data', error);
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
                setExpenseDetails(response.data); 
            } catch (error) {
                console.error('Error fetching expense data', error);
            }
        };
        fetchExpenseData();
    }, []);

    return (
        <div className="bg-orange-50 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-10">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-gradient-to-r from-teal-400 to-teal-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                        <h2 className="text-lg font-semibold">Total Budget</h2>
                        <p className="text-4xl font-bold">{budgetData}€</p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                        <h2 className="text-lg font-semibold">Total Expenses</h2>
                        <p className="text-4xl font-bold">{expenseData}€</p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-400 to-indigo-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                        <h2 className="text-lg font-semibold">Remaining Balance</h2>
                        <p className="text-4xl font-bold">{budgetData - expenseData}€</p>
                    </div>
                </div>

                <div className="bg-orange-50 p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Expense Overview</h2>
                  
                    <Chart data={expenseDetails} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
