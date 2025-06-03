const express = require('express')
const app = express()
const dotenv = require('dotenv');
// const supabase = require('./config/database');
const port = 4100;
const cors = require('cors');


// load environment variables from.env file
dotenv.config();


// Connect to Supabase
// (async () => {
//   try {
//     const { data, error } = await supabase.from('products').select('*');
//     if (error) throw error;
//     console.log('Successfully connected to Supabase');
//   } catch (error) {
//     console.error('Error connecting to Supabase:', error.message);
//   }
// })();


app.use(cors({
  origin: [
    'http://localhost:4100',  // Local development
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());




// // Middleware
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
