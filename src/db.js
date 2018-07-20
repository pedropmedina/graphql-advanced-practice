const mongoose = require('mongoose');

const connectToDB = (url = 'mongodb://localhost:27017/done') => {
	return mongoose.connect(
		url,
		{ useNewUrlParser: true },
	);
};

module.exports = connectToDB;
