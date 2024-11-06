// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/">BudgetApp</Link>
                </div>
                <div className="hidden md:flex space-x-8">
                    <Link to="/" className="hover:text-gray-300">Dashboard</Link>
                    <Link to="/budgets" className="hover:text-gray-300">Budgets</Link>
                    <Link to="/expenses" className="hover:text-gray-300">Expenses</Link>
                    <Link to="/recurringExpenses" className='hover:text-gray-300'>recurringExpenses</Link>
                </div>
                <button onClick={toggleMenu} className="md:hidden focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className="block hover:text-gray-300">Dashboard</Link>
                        <Link to="/budgets" className="block hover:text-gray-300">Budgets</Link>
                        <Link to="/expenses" className="block hover:text-gray-300">Expenses</Link>
                        <Link to="/recurringExpenses" className='hover:text-gray-300'>recurringExpenses</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
