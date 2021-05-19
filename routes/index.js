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

/* CREATE NEW BOOK FORM (books/new) */ 

/* CREATE NEW BOOK FORM (books/new)-post */ 

/* SHOWS BOOK DETAILS (books/:id) - get */ 

/* UPDATES BOOK DETAILS  (books/:id) - post */ 

/* DELETES BOOK (books/:id/delete) */ 



//404 HANDLER
router.use((req, res, next) => {
  const err = new Error(); //creating error object
  err.status = 404;
  next(err); //error object is passed to next function
});

//**Global Handler**/
router.use((err, req, res, next) => {
  if (err.status === 404) {
    err.message = "OOPS! That page doesn't exist.";
    console.log(err.message);
    res.status(err.status);
    return res.render("page-not-found", { err });
  } else {
    err.message = "Our bad, there was a server issue!";
    console.log(err.message);
    res.status(err.status);
    return res.render("error", { err });
  }
});

module.exports = router;