const Joi = require('joi')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const User = new mongoose.Schema({
username: {type: String, required: true},
email: {type: String, required: true},
password: {type: String, required: true}
});

module.exports = mongoose.model('users', User);

