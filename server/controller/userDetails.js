const getUserDetailsFromToken = require('../helpers/getUserDetailsFromToken');

async function userDetails(request, response) {
	try {
		// Now After User has logged in successfully, we can get the token from the cookies and then decode it to get the user details and send it back to the client side
		// request.cookies.token means we are getting the token from the cookies of the request
		const token = request.cookies.token || "";

		// Now we will get the user details from the token by calling the getUserDetailsFromToken function
		const user = await getUserDetailsFromToken(token);
		return response.status(200).json({
			message: 'User details fetched successfully',
			data: user
		});
	} catch (error) {
		// Server side errors
		response.status(500).send({
			message: error.message || error,
			error: true
		});
	}
}

module.exports = userDetails;
