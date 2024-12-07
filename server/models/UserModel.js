const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema(
	// Object
	{
		name: {
			type: String,
			required: (true, 'Name is required')
		},
		email: {
			type: String,
			required: (true, 'Email is required')
		},
		password: {
			type: String,
			required: (true, 'Password is required')
		},
		profile_pic: {
			// It will have the url of the image
			type: String,
			// Default Image would be empty string if the user does not upload the image
			default: ''
		}
	},
	{
		// The timestamps option will add the createdAt and updatedAt fields to the schema
		timestamps: true
	}
);

// const UserModel = mongoose.model('NameOfTheModel', schemaName); This will create a collection with the name 'NameOfTheModel' in the database
const UserModel = mongoose.model('User', userSchema);

// Export The Model
module.exports = UserModel;