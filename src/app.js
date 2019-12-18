const hbs = require('hbs');
const path = require('path')
const express = require('express');
const fs = require('fs');
const getQuestions = require('./getQuestions');
const UserSchema = require('./database/models/user');
const users = require('../src/database/routes/users');
const auth = require('../src/database/routes/auth');
const Entities = require('html-entities').AllHtmlEntities;
// const {createUser} = require("../src/database/index")

const publicDirectory = path.join(__dirname, '../public'); // where you want the static html files to come from
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath);

const Joi = require('joi')
const app = express();
const entities = new Entities();
const config = require('config');
const mongoose = require('mongoose');

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(publicDirectory)); // how you can access the public directory
app.set('view engine', 'hbs'); //allows you to use the handlebars template
app.set('views', viewsPath);


// if (!config.get('PrivateKey')) {
//     console.error('FATAL ERROR: PrivateKey is not defined.');
//     process.exit(1);
// }

mongoose.connect(`mongodb+srv://tom:password123abc@triviatribunaldatabase-bdqjy.mongodb.net/test?retryWrites=true&w=majority`,
{useNewUrlParser: true,useUnifiedTopology: true,
}).then(() => console.log('Connectedto MongoDB'))
.catch(err => console.error('Something went wrong', err));

app.get("/api", (req, res) => {
  getQuestions(response => {
    if (response.error) {
      res.send({
        error: response.error
      });
    }
    //a switch statement to cover all of the response codes that the API provides
    switch (response.response_code) {
      case 0: //results returned successfully
        console.log("get api is running");

        //construct the array of questions

        const questions = [];

        response.results.forEach(result => {
          questions.push({
            question: entities.decode(result.question),
            correctAnswer: entities.decode(result.correct_answer),
            wrongAnswer1: entities.decode(result.incorrect_answers[0]),
            wrongAnswer2: entities.decode(result.incorrect_answers[1]),
            wrongAnswer3: entities.decode(result.incorrect_answers[2])
          });
        });

        res.send({
          questions: questions
        });
        break;
      case 1:
        res.send({
          error:
            "There are not enough questions in this category in order to start the quiz"
        });
        break;
      case 2:
        res.send({
          error: "Invalid parameters have been passed to the trivia API"
        });
        break;
      case 3:
        res.send({
          error: "Session token does not exist"
        });
        break;
      case 4:
        res.send({
          error:
            "There are no unasked questions to give, the session token must be reset"
        });
        break;
    }
  });
});
//this renders the home page
app.get('/', async(req, res) => {
    res.render('home', );
    });
    app.post('/',async(req,res) => {
});

//this renders the play page (where the questions are)
app.get('/play', async(req, res) => {
  res.render('index', );
  });
  app.post('/',async(req,res) => {
});

//this renders the about page
app.get('/about', async(req, res) => {
  res.render('about', );
  });
  app.post('/',async(req,res) => {
});

//this renders the high scores page
app.get('/high-scores', async(req, res) => {
  res.render('highscores', );
  });
  app.post('/',async(req,res) => {
});

app.get('/signup', (req, res) => {
    res.render('signup', );
    console.log('signup page is loaded')
    });
    app.get('/signup_succes', (req, res) => {
        res.render('signup_success', );
        
        });

app.post('/signup', async(req,res)=>{ 
    const username = req.body.username;
    // const email = req.body.email;
    // const password = req.body.password;
    
    UserSchema.findOne({username: username}, (err,obj) => {
        console.log(obj)
        // let user = [ username, email, password ];
        console.log('username is ', username);
        if(err) {
            console.log("error");
        } else if (obj) {
            console.log('this username exists')
        } else {
            const user = new UserSchema({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            user.save()
            return res.redirect('/signup_success')
        }
    });
});


app.get('*', (req, res) => {
    res.send('<h1>404 your page does not exist</h1>')
});
app.listen(3000, () => {
    console.log('server is running ')
})