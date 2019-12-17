const Joi = require('joi')
const mongoose = require('mongoose');

const User = new mongoose.Schema({
username: {type: String, required: true},
email: {type: String, required: true},
password: {type: String, required: true}
});

validateUser = (user)=>{
    const schema = {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    };
    return Joi.validate(user, schema);
}

module.exports = mongoose.model('users', User);
exports.validate = validateUser