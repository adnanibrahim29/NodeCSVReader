const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const port = 3000;

const app = express();

app.get('/employees', (req, res) => {
    const results = [];
    
    fs.createReadStream('./data.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data)) // Putting each row as into Array 
        .on('end', () => {
            res.json(results); // Send the results as JSON Data//
        })
        .on('error', (err) => {
            res.status(400).json({message: "Error Reading CSV File", error: err.message});
        })
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})
