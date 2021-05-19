var express = require('express');
var router = express.Router();

//IMPORT THE BOOK MODEL FROM THE MODULES FOLDER
const {Book} = require('../models/');

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      next(error);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
  res.redirect("/books");
}));

router.get('/books', asyncHandler(async (req, res, next) => {
  //res.render('index', { title: 'Express' });
  const books = await Book.findAll();
  res.render('index', {books, title: "Library Database"})
}));

module.exports = router;
