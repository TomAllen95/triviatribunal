const express = require('express');
const router = express.Router();
const User = require("../database/models/user");
const bcrypt = require("bcrypt");


validateUser = (user)=>{
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    };
    return Joi.validate(user, schema);
}
getUserById = function(id, callback){
    User.findById(id, callback)
}
getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback); 
}
comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        callback(null, isMatch);
    })
}
createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

exports.validate = validateUser
exports.createUser = createUser
exports.comparePassword = comparePassword
exports.getUserByUsername = getUserByUsername
exports.getUserById = getUserById