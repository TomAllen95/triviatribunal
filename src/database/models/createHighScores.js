const mongoose = require('mongoose');
const ScoresSchema = require('./scores')

const highScores = JSON.parse(localStorage.getItem("highscores")) || [];

console.log(localStorage.getItem("highscores"));

finalScore.innertext = mostRecentScore;

mongoose.connect(`mongodb+srv://tom:password123abc@triviatribunaldatabase-bdqjy.mongodb.net/test?retryWrites=true&w=majority`,
{useNewUrlParser: true,useUnifiedTopology: true,
}).then(() => console.log('Connectedto MongoDB'))
.catch(err => console.error('Something went wrong', err));

//this needs to be a fuction
registerScore = (playersScore) => {
  const score = new ScoresSchema({
    username: 'dummydata',
    score: playersScore
  })

  highScores.sort( (a, b) => {
        return b.score - a.score;
      });
score.save();
};

