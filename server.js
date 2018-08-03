'use strict';

// `require` is used to import third party libraries
// here we use it to import express
const express = require('express');
// importing the product.js file
// ./ sibling file name models and than the file
//./ look at the siblings go inside public than go to the file
const Product = require('./models/product');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const env = require('./env');
// calling `express()` creates a new app, which we set to 
// the constant `app`
const app = express();
// cross origin resource sharing. used to share data between the front and back end
const cors = require('cors');


const bodyParser = require('body-parser');

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// endpoints works GETALL
app.get('/products', (req, res) => {
	Product
		.find()
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





app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = env.dbUrl, port = 8080) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
