// require('dotenv').config();

const request =require('request');
const {promisify} = require('util');
const fs = require('fs');

const getQuestions = async (callBack) =>{

    const questionApiURL = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`
    
    request({url: questionApiURL, json: true},(error, response) =>{
        if (error){
            console.log('Cannot connect to API services')
        }else{
            // console.log(response.body)
            console.log(response.body.results[0].question)
            console.log(response.body.results[0].correct_answer)
            console.log(response.body.results[0].incorrect_answers[0])
            console.log(response.body.results[0].incorrect_answers[1])
            console.log(response.body.results[0].incorrect_answers[2])


            callBack(response.body)
    }});
}

module.exports = getQuestions; // node - allows us to use the function in other places