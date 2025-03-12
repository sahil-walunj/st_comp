const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    zlink: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      zprice: {
        type: String,
        required: true,
      },
      imglink: {
        type: String,
        required: true,
      },
      swiggyTitle: {
        type: String,
        required: true,
      },
      swiggyPrice: {
        type: String,
        required: true,
      },
      swiggyQuantity: {
        type: String,
        required: true,
      },
      swiggyLink: {
        type: String,
        required: true,
      },
      zeptoTitle: {
        type: String,
        required: true,
      },
      zeptoPrice: {
        type: String,
        required: true,
      },
      zeptoQuantity: {
        type: String,
        required: true,
      },
      zeptoLink: {
        type: String,
        required: true,
      },
});
const Vegetable = mongoose.model('Vegetable', itemSchema, 'vegetables');
const Fruit = mongoose.model('Fruit', itemSchema, 'fruits');
const Seasonal = mongoose.model('Seasonal', itemSchema, 'seasonals');
const Snack = mongoose.model('Snack', itemSchema, 'snacks'); 
const Atta = mongoose.model('Atta', itemSchema, 'attas'); 
const Body = mongoose.model('Body', itemSchema, 'bodys'); 

module.exports = { Vegetable, Fruit, Seasonal, Snack, Atta, Body };

