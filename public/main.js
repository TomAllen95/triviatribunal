const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));


app.use(bodyParser.json());
// app.engine('.hbs',hbs({    defaultLayout: 'layout',    extname: '.hbs'}));

app.set('view engine','.hbs');

app.get('/', async(req, res) => {
    res.render('index', );
    });
    app.post('/',async(req,res) => {
});
app.listen(3000, () => {
        console.log('Your Sever is running on Port 3000')
    })

