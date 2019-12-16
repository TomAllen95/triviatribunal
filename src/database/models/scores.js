const mongoose = require('mongoose');

const score = new mongoose.Schema({
username: {type: String, required: true},
score: {type: Number, required: true},
});

module.exports = mongoose.model('Score', Score);












