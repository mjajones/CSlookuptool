const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Oneofus0548!', 
    database: 'XplosiveElectronics' 
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

// Route to fetch inventory for a specific location
app.get('/inventory/:locationId', (req, res) => {
    const locationId = req.params.locationId;

    const query = `
        SELECT Product.Name, Product.Description, Inventory.Quantity
        FROM Inventory
        JOIN Product ON Inventory.Product_ID = Product.Product_ID
        WHERE Inventory.Location_ID = ?`;

    db.query(query, [locationId], (err, results) => {
        if (err) {
            console.error('Error fetching inventory:', err);
            res.status(500).json({ error: 'Database query error' });
        } else {
            res.json(results);
        }
    });
});

// Route for the homepage or other pags
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server on port 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Inventory lookup app is running on http://localhost:${PORT}`);
});