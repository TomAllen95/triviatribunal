const hbs = require('hbs');
const path = require('path')
const express = require('express');
const fs = require('fs');
const getQuestions = require('./getQuestions')
const partialPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialPath);
const app = express();

const publicDirectory = path.join(__dirname, './views'); // where you want the static html files to come from
app.use(express.static(publicDirectory)); // how you can access the public directory

app.set('view engine', 'hbs'); //allows youy to use the handlebars template
// app.set('views', viewsPath);

app.get('/api', (req, res)=>{ 
    
    // if(!req.query.city){
    //     res.send({
    //         error: "there we"
    //     })
    // }else{
        getQuestions( (response) => {
            if(response.error){
                res.send({
                    error: response.error
                })
            }else{
                console.log('get api is running')
                res.send({ // how to create an api
                    
                    question: response.results[0].question,
                    correctAnswer: response.results[0].correct_answer,
                    wrongAnswer1: response.results[0].incorrect_answers[0],
                    wrongAnswer2: response.results[0].incorrect_answers[1],
                    wrongAnswer3: response.results[0].incorrect_answers[2],
                })
            }
        })
    
    // }
})
app.get('/', async(req, res) => {
    res.render('index', );
    });
    app.post('/',async(req,res) => {
});

app.get('*', (req, res) => {
    res.send('<h1>404 your page does not exist</h1>')
});
app.listen(3000, () => {
    console.log('server is running ')
})