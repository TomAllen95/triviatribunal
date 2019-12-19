const express = require('express');
const config = require('config');
const router = express.Router();


function ensureAuthenticated (req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('registerlogin') // if not logged in return to login page
  }
 
exports.ensureAuthenticated = ensureAuthenticated
module.exports = router;