const mongoose = require('mongoose');
const items = require('./items.json');
const Item = require('./models/Item');
require('dotenv').config();

const populateDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		await Item.deleteMany();
		await Item.create(items);
		console.log('DB created...');
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

populateDB();
