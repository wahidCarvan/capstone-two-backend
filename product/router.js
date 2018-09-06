const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const {Product} = require('./models');
const passport = require('passport');

const jwtAuth = passport.authenticate('jwt', { session: false });



router.get('/', (req, res) => {
	Product
  .find()
  .then((docs) => {
    res.json(
      docs.map(function(doc){
        return doc.serialize()
      }))
  })
  .catch((error) => {res.json(error)});

});
//get one
router.get('/:id',(req, res) => {
	Product
	//returns one findById
	.findOne({_id:req.params.id})
	.then((doc) => {
		if(!doc){
			return res.status(400).json({error: "Try again"})
		}
		res.json(doc.serialize())

	})
	.catch((error) => {res.json(error)});

});
//added some notes
// POST 
router.post('/',jwtAuth, (req, res) => {
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
 if(err) return res.status(500).json(err);
 res.status(201).json(doc.serialize());
});
});



// DELETE works
router.delete('/:id',jwtAuth, (req, res) => {
  Product.deleteOne({_id: req.params.id}, function(err){
  	if(err) return res.status(404).json(err);
   console.log(`Deleted item from cart \`${req.params.id}\``);
  			//204 means no message will be returned
        res.status(204).end();
      });

});

//PUT
router.put('/:id',jwtAuth, (req, res) => {
  const updatedableFields = ['image', 'originalPrice', 'price', 'description'];
  const updated = {};
  updatedableFields.forEach(field => {
    if (field in req.body){
      updated[field] = req.body[field];
    }
  });
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating shopping cart \`${req.params.id}\``);
  Product.findByIdAndUpdate(req.params.id, { $set: updated}, {new: true}).then(updatedProduct => res.status(204).end())
  .catch(err => res.status(500).json({message: 'Something went wrong'})); 
});
module.exports = {router}


