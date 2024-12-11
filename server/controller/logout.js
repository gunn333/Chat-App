async function logout(request, response) {
	try {
		// Now we will clear the token from the cookies by setting the token to an empty string
		return response.cookie('token', '', cookieOptions).status(200).json({
			message: 'Session Out',
			success: true
		});
	} catch (error) {
		return response.status(500).json({
			message: error.message || error,
			error: true
		});
	}
}

module.exports = logout;