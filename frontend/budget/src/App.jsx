import { useState } from 'react'
import '../src/styles/tailwind-base.css'
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import Expense from './pages/Expense';
import RecurringExpense from './pages/RecurringExpense';
import NotFound from './components/NotFound';

function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<Dashboard/>,
      errorElement:<NotFound/>
    },
    {
      path:'/budgets',
      element:<Budget/>,
      errorElement:<NotFound/>
    },
    {
      path:'/expenses',
      element:<Expense/>,
      errorElement:<NotFound/>
    },
    {
      path:'/recurringExpenses',
      element:<RecurringExpense/>,
      errorElement:<NotFound/>
    }

  ])
  return (
    <div>
      <RouterProvider router={router}/>

    </div>
  );
}
export default App;