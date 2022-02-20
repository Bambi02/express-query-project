const Item = require('../models/Item');

const getAllItems = async (req, res) => {
	const { onStock, company, name, sort, fields, numericFilters } = req.query;
	const queryObject = {};

	if (onStock) {
		queryObject.onStock = onStock === 'true' ? true : false;
	}

	if (company) {
		queryObject.company = company;
	}

	if (name) {
		queryObject.name = { $regex: name, $options: 'i' };
	}

	if (numericFilters) {
		const operatorMap = {
			'>': '$gt',
			'>=': '$gte',
			'=': '$eq',
			'<': '$lt',
			'<=': '$lte',
		};
		const regex = /\b(<|>|>=|=|<|<=)\b/g;
		let filters = numericFilters.replace(
			regex,
			(match) => `-${operatorMap[match]}-`
		);
		const options = ['price', 'rating'];
		filters = filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-');
			if (options.includes(field)) {
				queryObject[field] = { [operator]: Number(value) };
			}
		});
	}

	let data = Item.find(queryObject);

	if (sort) {
		const sorted = sort.split(',').join(' ');
		data = data.sort(sorted);
	}

	if (fields) {
		const fieldsList = fields.split(',').join(' ');
		data = data.select(fieldsList);
	}

	const page = Number(req.query.page) || 1;
	const limit = Number(req.query.limit) || 10;
	const skip = (page - 1) * limit;

	data = data.skip(skip).limit(limit);

	const items = await data;

	res.status(200).json({ items });
};

module.exports = getAllItems;
