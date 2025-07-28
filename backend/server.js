const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

const productRoute = require('./routes/api/productRoute');

// Connecting to the Database
let mongodb_url = 'mongodb://container-ya-mongo:27017/';
let dbName = 'yolomy';

// define a url to connect to the database
const MONGODB_URI = process.env.MONGO_URL || mongodb_url + dbName;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

// Check Connection
db.once('open', () => {
    console.log('Database connected successfully');
});

// Check for DB Errors
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

// Initializing express
const app = express();

// Body parser middleware
app.use(express.json());

// Use multer to parse form-data bodies
app.use(upload.array());

// Enable CORS
app.use(cors());

// Use product route
app.use('/api/products', productRoute);

// Define the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
