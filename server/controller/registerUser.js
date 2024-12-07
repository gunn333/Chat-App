const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');

async function registerUser(request, response) {
	try {
		// All this information will be needed to create a new user
		const { name, email, password, profile_pic } = request.body;

		// Check if the email already exists in the database or not
		const checkEmail = await UserModel.findOne({ email });
		// .findOne() is a Mongoose method used to find a single document in the collection that matches the given condition. In this case, the condition is { email }, meaning it will search for a user with a matching email.
		// Basically UserModel se find karo email ke basis pe, agar email mil gaya toh checkEmail me store kar do
		// If no user is found with the given email, checkEmail will be null.

		if (checkEmail) {
			return response.status(400).json({
				message: 'User already exists',
				error: true
			});
		}

		// Password Into Hashpassword Using bcrypt
		const salt = await bcryptjs.genSalt(10);
		const hashPassword = await bcryptjs.hash(password, salt);

		const payload = {
			name,
			email,
			profile_pic,
			password: hashPassword
		};

		// Basically Payload is a object which contains all the information of the user and then we will pass this object to the UserModel to create a new user in the database.
		const user = new UserModel(payload);
		const userSave = await user.save();

		return response.status(201).json({
			message: "User registered successfully",
			// It will return the user information that is saved in the database
			data: userSave,
			success: true
		});
	} catch (error) {
		return response.status(500).json({
			message: error.message || error,
			error: true
		});
	}
}

module.exports = registerUser;