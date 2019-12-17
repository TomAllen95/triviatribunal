const hbs = require('hbs');
const path = require('path')
const express = require('express');
const fs = require('fs');
const Entities = require('html-entities').AllHtmlEntities;
const getQuestions = require('./getQuestions')
const partialPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialPath);
const app = express();
const entities = new Entities();

const publicDirectory = path.join(__dirname, '../public'); // where you want the static html files to come from
app.use(express.static(publicDirectory)); // how you can access the public directory

app.set('view engine', 'hbs'); //allows youy to use the handlebars template
// app.set('views', viewsPath);

app.get('/api', (req, res) => {

    // if(!req.query.city){
    //     res.send({
    //         error: "there we"
    //     })
    // }else{
    getQuestions((response) => {
        if (response.error) {
            res.send({
                error: response.error
            })
        }

        //a switch statement to cover all of the response codes that the API provides
        switch (response.response_code) {
            case 0: //results returned successfully
                console.log('get api is running')

                //construct the array of questions

                const questions = []
                
                response.results.forEach(result => {

                    questions.push(
                        {
                            question: entities.decode(result.question),
                            correctAnswer: entities.decode(result.correct_answer).replace(/\\/g, ""),
                            wrongAnswer1: entities.decode(result.incorrect_answers[0]).replace(/\\/g, ""),
                            wrongAnswer2: entities.decode(result.incorrect_answers[1]).replace(/\\/g, ""),
                            wrongAnswer3: entities.decode(result.incorrect_answers[2]).replace(/\\/g, "")
                        }
                    )
                })

                res.send({
                    questions: questions
                })
                break;
            case 1:
                res.send({
                    error: "There are not enough questions in this category in order to start the quiz"
                })
                break;
            case 2:
                res.send({
                    error: "Invalid parameters have been passed to the trivia API"
                })
                break;
            case 3:
                res.send({
                    error: "Session token does not exist"
                })
                break;
            case 4:
                res.send({
                    error: "There are no unasked questions to give, the session token must be reset"
                })
                break;

        }
    })

    // }
})
app.get('/', async (req, res) => {
    res.render('index');
});
app.post('/', async (req, res) => {
});
app.get('/signup', async (req, res) => {
    res.render('signup');
});
app.post('/', async (req, res) => {
});
app.post('/signup', function (req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let pass = req.body.password;
    let data = {
        "name": name,
        "email": email,
        "password": pass,
    }
    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");
    });
    return res.redirect('signup_success');
})
app.get('*', (req, res) => {
    res.send('<h1>404 your page does not exist</h1>')
});
app.listen(3000, () => {
    console.log('server is running ')
})