var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Inventory = require('../models/Inventory.js');

/* GET ALL Inventory */
router.get('/', function(req, res, next) {
  Inventory.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Inventory BY ID */
router.get('/:id', function(req, res, next) {
  Inventory.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* Filter */ 
router.get('/filter/:str', function(req, res, next) {
  console.log({req})
  let searchString = req.params.str;
  console.log({searchString})
  Inventory.find({$text: {$search:'1001'}},function(err, docs) { 
   if (err) return next(err);
   res.json(docs);
  });
  // Inventory.find({$text: {$search: searchString}})
  //      .limit(20).exec(function(err, docs) { 
  //       if (err) return next(err);
  //       res.json(docs);
  //      });
});

/* SAVE Inventory */
router.post('/', function(req, res, next) {
  Inventory.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Inventory */
router.put('/:id', function(req, res, next) {
  Inventory.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Inventory */
router.delete('/:id', function(req, res, next) {
  Inventory.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
