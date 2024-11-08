// src/pages/Dashboard.js
import React, { useEffect,useState } from 'react';
import Navbar from '../components/Navbar';
import ExpenseChart from '../components/Chart'; // Import the ExpenseChart component

import axios from 'axios';

const Dashboard = () => {
    const [budgetData,setBudgetData]=useState(0);


    useEffect(()=>{
        const fetchBudgetData=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/api/budgets');
              
                const totalBudget = response.data.reduce((acc, item) => acc + item.budget_amount, 0);
                setBudgetData(totalBudget)

            }catch(error){
                console.error("error fetching budget data",error)
            }
        };
        fetchBudgetData()
    },[])
    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

                {/* Stats Grid (Budget, Expenses, Remaining Balance) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Total Budget</h2>
                        <p className="text-3xl">{budgetData}$</p>
                    </div>
                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Total Expenses</h2>
                        <p className="text-3xl">$0</p>
                    </div>
                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Remaining Balance</h2>
                        <p className="text-3xl">$0</p>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                    <ul>
                        <li className="border-b py-2">Activity description: $0 (01/01/2024)</li>
                        <li className="border-b py-2">Activity description: $0 (01/02/2024)</li>
                        <li className="border-b py-2">Activity description: $0 (01/03/2024)</li>
                    </ul>
                </div>

                {/* Expense Overview with Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Expense Overview</h2>
                    {/* Placeholder Chart */}
                    <div className="h-64 bg-gray-300 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
