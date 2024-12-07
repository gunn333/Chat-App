const mongoose = require('mongoose');

// Now I will create a function that will connect to the MongoDB database
// This will be a Async Function.
async function connectDB() {
	try {
		// Connect to the MongoDB Database
		// The connect method will return a promise
		await mongoose.connect(process.env.MONGODB_URI);

		// If the connection is successful
		const connection = mongoose.connection;
		connection.on('connected', () => {
			console.log('Connected to the MongoDB Database');
		});

		// If the connection is unsuccessful
		connection.on('error', error => {
			console.log('Something is wrong in MongoDB', error);
		});
	} catch (error) {
		console.log('Error connecting to the database', error);
	}
}

// Export The Function
module.exports = connectDB;
