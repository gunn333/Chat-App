// This page is for Login API. This API will check if the email is already in the database or not. If the email is in the database then it will return the user data. If the email is not in the database then it will return a message that the user is not found.
const UserModel = require('../models/UserModel');

async function checkEmail(request, response) {
	try {
		const { email } = request.body;
		// Now I will check if the email is already in the database or not
		// I removed the password field from the result as I don't want to send the password in the client side
		// This excludes the password field from the returned result. You don’t want to send sensitive information (like passwords) back to the client.
		const checkEmail = await UserModel.findOne({ email }).select(
			'-password'
		);

		// If Email is not in the database then I will send OK status
		if (!checkEmail) {
			return response.status(200).json({
				message: 'User not found',
				error: true
			});
		}

		// If Email is in the database
		return response.status(200).json({
			message: 'Email verified',
			success: true,
			data: checkEmail
		});
	} catch (error) {
		return request.status(500).json({
			message: error.message || error,
			error: true
		});
	}
}

module.exports = checkEmail;
