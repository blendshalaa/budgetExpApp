// server.js
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const budgetRoutes=require('./routes/budgetRoutes');
const expenseRoutes=require('./routes/expenseRoutes');
const categoryRoutes=require('./routes/categoryRoutes');
const recurringExpenseRoutes=require('./routes/recurringExpenseRoutes')
// Import the database connection

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Expense Tracker API');
});

// Test database connection route
// server.js
app.get('/test-connection', async (req, res) => {
    try {
        const client = await pool.connect(); // Attempt to connect to the database
        const result = await client.query('SELECT NOW()'); // Execute a simple query
        client.release(); // Release the client back to the pool
        console.log('Database connected at:', result.rows[0].now); // Log the connection time to the terminal
        res.json({ message: 'Database connected!', time: result.rows[0].now });
    } catch (err) {
        console.error('Database connection error:', err); // Log the error to the console
        res.status(500).json({ error: 'Database connection failed!' });
    }
});

app.use('/api/budgets', budgetRoutes);
app.use('/api/expenses',expenseRoutes);
app.use('/api/categories',categoryRoutes);
app.use('/api/recurring_expenses',recurringExpenseRoutes)




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
