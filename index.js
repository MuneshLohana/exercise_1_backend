const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 5000;

// Use middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// PostgreSQL configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'demo',
    password: 'demo',
    port: 5432,
});
// Auther Munesh Lohana
// created: 26.01.2024
// Backend endpoint to add a record to the database
app.post('/records/add', async (req, res) => {
    const { name, phoneNumber } = req.body;

    try {
        const result = await pool.query('INSERT INTO records(name, phoneNumber) VALUES($1, $2) RETURNING *', [name, phoneNumber]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Backend endpoint to retrieve all records from the database
app.get('/records/getAll', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM records');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
