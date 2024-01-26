const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;
const records = []; // Array to store records in memory

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Backend endpoint to add a record to the in-memory array
app.post('/records/add', (req, res) => {
    const { name, phoneNumber } = req.body;
    const newRecord = { id: generateUniqueId(), name, phoneNumber };
    
    records.push(newRecord);

    res.json(newRecord);
});

// Backend endpoint to retrieve all records from the in-memory array
app.get('/records/getAll', (req, res) => {
    res.json(records);
});

// Function to generate a unique ID (for simplicity)
function generateUniqueId() {
    return Date.now();
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// const express = require('express');
// const bodyParser = require('body-parser');
// const { Pool } = require('pg');

// const app = express();
// const port = 3000;

// // Use middleware to parse JSON requests
// app.use(bodyParser.json());

// // PostgreSQL configuration
// const pool = new Pool({
//     user: 'your_database_username',
//     host: 'localhost',
//     database: 'your_database_name',
//     password: 'your_database_password',
//     port: 5432,
// });

// // Backend endpoint to add a record to the database
// app.post('/records/add', async (req, res) => {
//     const { name, phoneNumber } = req.body;

//     try {
//         const result = await pool.query('INSERT INTO records(name, phoneNumber) VALUES($1, $2) RETURNING *', [name, phoneNumber]);
//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Backend endpoint to retrieve all records from the database
// app.get('/records/getAll', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM records');
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
