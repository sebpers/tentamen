const express = require('express')
const router = express.Router()

const listing = require('./listing.js')

router.get("/listings", listing.get);
router.get("/listings/:id", listing.getById);
router.post("/listings", listing.post);
router.delete("/listings/:id", listing.deleteById);
router.put("/listings/:id", listing.put);

module.exports = router