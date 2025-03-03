const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); 
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5500',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));


app.post('/submit', async (req, res) => {
  const { firstName, secondName, phone, email } = req.body;
  try {
    console.log("Received data:", { firstName, secondName, phone, email });

    const result = await db.query(
      'INSERT INTO users (firstname, secondname, phone, email) VALUES ($1, $2, $3, $4)',
      [firstName, secondName, phone, email]
    );

    console.log("Data inserted:", result);
    res.status(200).json({ message: 'Data inserted successfully!' });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.use((req, res) => {
  res.status(404).json({ message: 'Oops! Page not found.' });
});
