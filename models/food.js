var mongoose = require ('mongoose');

// food schema
var foodSchema = mongoose.Schema ( {
	name : {
		type: String,
		required: true
	},
	price : {
		type: Number,
		required: true
	},
	location: {
		type: String
	}

});

var Food = module.exports = mongoose.model('Food', foodSchema);

//Get food
module.exports.getFoods = function (callback){
	Food.find(callback);
}

module.exports.getFoodById = function (id, callback){
	Food.findById(id, callback);
}

// Add food
module.exports.addFood = function (food, callback){
	Food.create(food, callback);
}

// Update food
module.exports.updateFood = function (id, food, options, callback){
	var query = {_id: id};
	var update = {
		name: food.name,
		price: food.price
	}
	Food.findOneAndUpdate(query, update, options, callback);
}

// delete food
module.exports.removeFood = function (id, callback){
	var query = {_id: id};
	Food.remove(query, callback);
}