'use strict';

// `require` is used to import third party libraries
// here we use it to import express
const express = require('express');
// importing the product.js file
// ./ sibling file name models and than the file
//./ look at the siblings go inside public than go to the file
const Product = require('./models/product')
const mongoose = require('mongoose')
const env = require('./env');
mongoose.connect(env.dbUrl);
// calling `express()` creates a new app, which we set to 
// the constant `app`
const app = express();
// cross origin resource sharing. used to share data between the front and back end
const cors = require('cors');


const bodyParser = require('body-parser')

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

// endpoints works GETALL
app.get('/products', (req, res) => {
	Product
		.find({})
		.then((docs) => {res.json(docs)})
		.catch((error) => {res.json(error)});
	
});
//get one
app.get('/products/:id', (req, res) => {
	Product
	//returns one findById
	.findOne({_id:req.params.id})
	.then((doc) => {
		if(!doc){
			return res.status(400).json({error: "Try again"})
		}
		res.json(doc)

	})
	.catch((error) => {res.json(error)});

});

// POST 
app.post('/products', (req, res) => {
  const requiredFields = ['image', 'name', 'originalPrice', 'price', 'description'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const product = {
  	image: req.body.image, 
  	originalPrice: req.body.originalPrice, 
  	price: req.body.price,
  	description: req.body.description,
  	name: req.body.name
  }
// if something goes wrong return the error
  Product.create(product, function(err, doc){
  	if(err) return res.status(404).json(err);
  	  res.status(201).json(doc);
	});
  });



// DELETE works
app.delete('/products/:id', (req, res) => {
  Product.deleteOne({_id: req.params.id}, function(err){
  	if(err) return res.status(404).json(err);
  	  console.log(`Deleted item from cart \`${req.params.id}\``);
  			//204 means no message will be returned
  		res.status(204).end();
  });

});

//PUT
app.put('/products/:id', (req, res) => {
  const requiredFields = ['image', 'originalPrice', 'price', 'description'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating shopping cart \`${req.params.id}\``);
  Product.update({
    id: req.params.id,
    name: req.body.name,
    budget: req.body.budget
  });
  res.status(204).end();
});






// listen for requests and log when you've started doing it
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port  ${process.env.PORT || 8080}`));
