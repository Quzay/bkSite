const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); 
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:3000',
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



// app.get("/get-hotel/:id", async (req, res) => {
//   const hotelId = req.params.id;
//   console.log("Отримання готелю з ID:", hotelId);

//   try {
//       const result = await db.query(
//           "SELECT hotel_name, price_per_night FROM hotels WHERE id = $1",
//           [hotelId]
//       );
//       console.log("Результат запиту:", result.rows);

//       if (result.rows.length > 0) {
//           res.json(result.rows[0]);
//       } else {
//           res.status(404).json({ error: "Готель не знайдено" });
//       }
//   } catch (error) {
//       console.error("Помилка отримання готелю:", error); // Тут буде детальна помилка
//       res.status(500).json({ error: "Помилка сервера" });
//   }
// });




app.post('/log-view', async (req, res) => {
  console.log("Отриманий body:", req.body); 
  try {
      const { hotel_id} = req.body;
      if (!hotel_id) {
          return res.status(400).json({ error: "hotel_id is required" });
      }

      const query = `
        INSERT INTO bookings (hotel_id,  booking_date)
        VALUES ($1, NOW())
        RETURNING *
      `;
      const result = await db.query(query, [hotel_id]);

      res.json({ success: true, data: result.rows[0] });
  } catch (error) {
      console.error('Помилка запису в базу:', error);
      res.status(500).json({ error: 'Внутрішня помилка сервера' });
  }
});


app.get('/get-bookings', async (req, res) => {
  try {
      console.log("Отримання всіх бронювань...");
      const result = await db.query("SELECT * FROM bookings");
      console.log("Результат запиту:", result.rows);
      res.json(result.rows);
  } catch (error) {
      console.error('Помилка отримання бронювань:', error.message);
      res.status(500).json({ error: 'Внутрішня помилка сервера', details: error.message });
  }
});

