const mongoose = require('mongoose');

const Score = new mongoose.Schema({
username: {type: String, required: true},
score: {type: Number, required: true},
});

module.exports = mongoose.model('Score', Score);












