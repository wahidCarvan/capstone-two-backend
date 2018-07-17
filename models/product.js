const mongoose = require('mongoose');

// this is our schema to represent the products
const productSchema = mongoose.Schema({
  // the `name` property is String type and required
  name: {type: String, required: true},
  originalPrice: {type: Number, required: false},
  price: {type: Number, required: true},
  description:{type: String, required: true},
  image:{type:String, required: true}
});
// exporting the file make a new model so we can use elsewhere
// Nameing the model name and schema is needed to make a mongoose schema
module.exports = mongoose.model('Product', productSchema);