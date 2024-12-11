const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// Inside the function, we will accept the token as an argument and then decode the token to get the user details. We will use the jsonwebtoken library to decode the token. We will also check if the token is valid or not. If the token is not valid, we will return an empty object.
const getUserDetailsFromToken = async token => {
	// If Token is not available
	if (!token) {
		return {
			message: 'Session Expired',
			// logout is boolean value, which will be used to logout the user from the client side if the token is not valid.
			logout: true
		};
	}
		// Decode the token
		// jwt.verify() method is used to verify the token and return the decoded data. This function takes the token and the secret key, checks if the token is valid and gives back the information stored in the token if it's okay.
		const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

		// The decoded token will have the user id. We will use the user id to get the user details from the database.
		const user = await UserModel.findById(decode.id).select('-password');
		return user;
};

module.exports = getUserDetailsFromToken;
// Now, we need to use this function in the userDetails controller to get the user details from the token. We will pass the token from the cookies to this function and get the user details.
