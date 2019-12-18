const mongoose = require('mongoose');
const ScoresSchema = require('./scores')

mongoose.connect(`mongodb+srv://tom:password123abc@triviatribunaldatabase-bdqjy.mongodb.net/test?retryWrites=true&w=majority`,
{useNewUrlParser: true,useUnifiedTopology: true,
}).then(() => console.log('Connectedto MongoDB'))
.catch(err => console.error('Something went wrong', err));

const score = new ScoresSchema({
    username:'Davey',
    score: 3
  })
score.save();