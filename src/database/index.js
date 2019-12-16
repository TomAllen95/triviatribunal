require('dotenv').config();

const mongoose = require('mongoose');
const Player = require('./models/players');

mongoose.connect(`mongodb+srv://tom:password123abc@triviatribunaldatabase-bdqjy.mongodb.net/test?retryWrites=true&w=majority`,
{
useNewUrlParser: true,
useUnifiedTopology: true,
});
const Player = new Player({
    name: '',
    score: '',
    email: '',
    password: ''
    });
    
//     Player.save();

// Player.find(function(err, users) {
//   if (err) return console.error(err);
//   console.log(users);
// });