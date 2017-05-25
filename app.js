var express = require ('express');
var app = express();
var bodyParser = require('body-Parser');
var mongoose = require ('mongoose');
app.use(bodyParser.json());

Food = require('./models/food');

// connect to mongoose
mongoose.connect('mongodb://localhost/inventory');
var db = mongoose.connection;

app.get('/', function (req, res) {
	res.send('Please use /api/inventory');
});

app.get('/api/foods', function (req, res){
	Food.getFoods(function(err, foods){
		if(err){
			throw err;		
		}
		res.json(foods);
		console.log();
	});
});

app.get('/api/foods/:_id', function (req, res){
	Food.getFoodById(req.params._id, function(err, food){
		if(err){
			throw err;		
		}
		res.json(food);
	});
});

app.post('/api/foods/', function (req, res){
	var food = req.body;
	Food.addFood(food, function(err, food){
		if(err){
			throw err;		
		}
		res.json(food);
	});
});

// update
app.put('/api/foods/:_id', function (req, res){
	var id = req.params._id;
	var food = req.body;
	Food.updateFood(id, food, {}, function(err, food){
		if(err){
			throw err;		
		}
		res.json(food);
	});
});

//remove
app.delete('/api/foods/:_id', function (req, res){
	var id = req.params._id;
	Food.removeFood(id, function(err, food){
		if(err){
			throw err;		
		}
		res.json(food);
	});
});

app.listen(3000);
console.log('Starting on port 3000');
