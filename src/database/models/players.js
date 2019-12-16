const mongoose = require('mongoose');

const Player = new mongoose.Schema({
name: {type: String, required: true},
score: {type: Number, required: true},
email: {type: String, required: true},
password: {type: String, required: true}
});

module.exports = mongoose.model('Player', Player);