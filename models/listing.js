mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  coordinates: {
      lat: Number,
      lng: Number
 },
  address: {
    street: String,
    number: Number
  },
  summary: {
    condo: Boolean,
    villa: Boolean,
    price: Number,
    fee: Number,
    bidding: Boolean
  },
    location: String
});



const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;