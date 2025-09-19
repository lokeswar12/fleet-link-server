import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {mongoUrl, SERVER_CONFIG} from '../config.js';
import router from './routes/routes.js';

const app = express()

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const dbUrl = mongoUrl.MONGO_URL;
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true,})
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api", router)

// Start the server
const PORT = SERVER_CONFIG?.PORT
const HOST = SERVER_CONFIG?.HOST

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}`);
});