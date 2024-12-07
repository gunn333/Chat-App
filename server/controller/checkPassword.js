const UserModel = require('../models/UserModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function checkPassword(request, response) {
	try {
		// Get the password and userId from the request body because we need to know who is the user who added the password
		const { password, userId } = request.body;

		// Found the user information using the userId
		const user = await UserModel.findById(userId);

		// password is the password that the user entered (PLAIN PASSWORD) and user.password is the password that is stored in the database (HASHED PASSWORD)
		// .compare() method is used to compare the plain password with the hashed password and it will return true if the password is correct and false if the password is incorrect
		const verifyPassword = await bcryptjs.compare(password, user.password);

		// If the password is incorrect, return false
		if (!verifyPassword) {
			return response.status(400).json({
				message: 'Please enter the correct password',
				error: true
			});
		}

		const tokenData = {
			userId: user._id,
			email: user.email
		};
		const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
			expiresIn: '1d'
		});

		const cookieOptions = {
			http: true,
			secure: true
		};

		// If the password is correct, return true
		// .cookie() method is used to set the cookie in the client side and it takes the cookie name, cookie value and cookie options as the parameters
		// The cookie name is 'token' and the cookie value is the token that we generated and the cookie options are the options that we want to set for the cookie like http: true which means that the cookie can only be accessed by the http protocol and secure: true which means that the cookie can only be accessed by the secure protocol
		return response.cookie('token', token, cookieOptions).status(200).json({
			message: 'Login Successfully',
			// Instead of returning the user information, return the token because the user information is sensitive and we don't want to expose it to the client side and we can use the token to get the user information .
			// The token is used to authenticate the user and get the user information from the server side and token basically has the user information but unlike the user information, the token is not sensitive as it is encrypted and can only be decrypted by the server side.
			// data: user,
			token: token,
			success: true
		});
	} catch (error) {
		return response.status(500).json({
			error: error.message,
			error: true
		});
	}
}

module.exports = checkPassword;
