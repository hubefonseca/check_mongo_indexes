var cold = require('./cold.json')
var hot = require('./hot.json')

var _ = require('lodash');

const extraOnHot = [];

_.each(hot, col => {
	const name = col.name;
	const indexes = col.indexes;
	
	const coldCol = _.find(cold, c => col.name == c.name)
	if (!coldCol) {
		console.log('Collection', name, 'not found on cold db, skipping');
		return;
	}
	
	const coldIndexes = coldCol.indexes;
	
	_.each(indexes, i => {
		// console.log('index', i.key);
		const indexOnCold = _.find(coldIndexes, ci => _.isEqual(i.key, ci.key));
		if (!indexOnCold) {
			extraOnHot.push(i);
			console.log('Index', i.key, 'not found on cold db');
		}
	})
})

console.log(' ')
if (extraOnHot.length > 0) {
	console.log('--- There are indexes missing:');
	_.each(extraOnHot, i => console.log(i.collection, '->', i.key));
} else {
	console.log('No indexes missing');
}