var mongoose = require('mongoose');

var InventorySchema = new mongoose.Schema({
  item_code: String,
  name1: String,
  name2: String,
  price: Number,
  vendor_name: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inventory', InventorySchema);
