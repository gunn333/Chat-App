// Import The Packages
const express = require('express');
const cors = require('cors');
// This Will Load The Environment Variables From The .env File
require('dotenv').config();
// Import The connectDB Function
const connectDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');

// Create The Express App
const app = express();

// Use The Cors Middleware To Allow Cross-Origin Requests
app.use(
	cors({
		// The origin is the frontend URL that we want to allow to connect to the backend
		origin: process.env.FRONTEND_URL,
		// credentials true will allow the cookies to be sent from the frontend to the backend
		credentials: true
	})
);
// This will allow us to access the request body as req.body in the routes
app.use(express.json());
// This will allow us to access the cookies from the request
app.use(cookieParser());

// Server Port (server url)
const PORT = process.env.PORT || 8000;

// Routes
// / is the root route
app.get('/', (request, response) => {
	response.json({
		message: 'Server is running on port 8000'
	});
});

// Connect To The Database
connectDB().then(() => {
	console.log('Connected to the MongoDB Database');
});

const router = require('./routes/index');
// api endpoints
app.use('/api', router);
// Start The Server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
