const notFound = (req, res) => {
	res.status(404).send('404 - route does not exist');
};

module.exports = notFound;
