const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	name: {
		type: String,
		require: [true, 'item name must be provided'],
		trim: true,
	},
	price: {
		type: Number,
		require: [true, 'item price must be provided'],
	},
	company: {
		type: String,
		enum: {
			values: ['ikea', 'liddy', 'caressa', 'marcos'],
			message: '{VALUE} is not supported',
		},
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	onStock: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('Item', ItemSchema);
