const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
 


router.all('/session-flash', function( req, res ) {
    req.session.sessionFlash = {
      type: 'info',
      message: 'This username is already taken, pleas chooses another'
    }
    res.redirect(301, '/');
  });
 
module.exports = router;