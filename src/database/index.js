require('dotenv').config();

const mongoose = require('mongoose');
const Player = require('./models/players');
const Score = require('./models/scores');

mongoose.connect(`mongodb+srv://tom:password123abc@triviatribunaldatabase-bdqjy.mongodb.net/test?retryWrites=true&w=majority`,
{
useNewUrlParser: true,
useUnifiedTopology: true,
});

const Player = new Player({
    username: '',
    email: '',
    password: '',
    });

recordScore = () => {
    const Score = new Score({
    username:'',
    score: ''
})
}
    
//     Player.save();

// Player.find(function(err, users) {
//   if (err) return console.error(err);
//   console.log(users);
// });