const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
	// Object
	{
		text: {
			type: String,
			default: ''
		},
		imageUrl: {
			type: String,
			default: ''
		},
		videoUrl: {
			type: String,
			default: ''
		},
		// If this message is seen by user or not
		Seen: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

// Conversation Schema
const conversationSchema = new mongoose.Schema(
	// Create Object having the properties of the Schema
	{
		// Sender User Id
		// unique ID of the "sender" user.
		sender: {
			// mongoose.Schema.ObjectId refers to the ObjectId type in MongoDB.
			// MongoDB uses ObjectId to generate unique IDs for each document.
			type: mongoose.Schema.ObjectId,
			required: true,
			// ref is used to reference another model. In this case, we are referencing the User model.
			ref: 'User'
		},
		reciever: {
			type: mongoose.Schema.ObjectId,
			required: true,
			ref: 'User'
		},
		// Messages Array
		// [] indicates that the messages property is an array. This array will contain the messages sent between the sender and receiver.
		// Each element in the array will hold a reference to a document in the Message collection.

		messages: [
			{
				// Unique ID of the message
				type: mongoose.Schema.ObjectId,
				// This tells Mongoose that this ID points to a document in the 'Message' collection.
				ref: 'Message'
			}
		]
	},
	{
		timestamps: true
	}
);

// Define The Message Model
const MessageModel = mongoose.model('Message', messageSchema);
// Define The Conversation Model
const ConversationModel = mongoose.model('Conversation', conversationSchema);

// Export The Conversation Model
module.exports = {
	MessageModel,
	ConversationModel
};
