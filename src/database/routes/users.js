const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
 
router.all('/session-flash', function( req, res ) {
    req.session.sessionFlash = {
      type: 'info',
      message: 'This username is already taken, pleas chooses another'
    }
    res.redirect(301, '/');
  });
  

module.exports = router;