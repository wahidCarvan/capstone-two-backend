'use strict';
// `require` is used to import third party libraries
// here we use it to import express
const express = require('express');
// importing the product.js file
// ./ sibling file name models and than the file
//./ look at the siblings go inside public than go to the file
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const env = require('./env');
// calling `express()` creates a new app, which we set to 
// the constant `app`
const app = express();
// cross origin resource sharing. used to share data between the front and back end
const cors = require('cors');


const bodyParser = require('body-parser');
const {router:productsRouter} = require("./product")

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static('public'))
app.use("/products", productsRouter)
// endpoints works GETALL

app.use('*', function (req, res) {
  res.status(404).json({ message: 'Not Found' });
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = env.dbUrl, port = process.env.PORT || 8080) {
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
