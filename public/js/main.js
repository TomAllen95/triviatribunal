const question = document.getElementById('theQ');
const choices = Array.from(document.getElementsByClassName('cardContent'));


//questions are objects
let currentQuestion = {};
//set to true later, once question has finished being read.
let acceptingAnswers = false;
//player score
let score = 0;
//which question we are on
let questionCounter = 0;
//Our question Poule
// let availableQuestions = [];
let questions = [];
//CONSTANTS
const correct_bonus = 10;
const max_Questions = 10;


startGame  = async () => {
    questionCounter = 0;
    score = 0;
                        //using the spread array with the ... basically, take this array, spread out its items and make a new array...if that makes sense?
    await fetch('http://localhost:3000/api').then( (response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                question.textContent = data.error;
            } else {
                questions = data;
                console.log(questions)
                getNewQuestion();
            }
        })
    })

}
getNewQuestion = () => {
    if(questions.length === 0 || questionCounter > max_Questions){
        //go to the end page. what is in there is really a placeholder. it's whatever you call the 'Game over/Winner' page
        // return window.location.assign('/end.html');
    }
    questionCounter++;
    let questionIndex = Math.floor(Math.random() * questions.length);  
    currentQuestion = questions.question;
    question.textContent = "Q." + currentQuestion;
    
    answers = [questions.correctAnswer, questions.wrongAnswer1, questions.wrongAnswer2, questions.wrongAnswer3]
    console.log(answers);
    // choices.textContent = answers

    choices.forEach( choice => {
        const number = choice.dataSet['number'];
        choice.textContent = currentQuestion ['choice' + number];
    });
    //this will take the availableQuestions array and remove the question we just used. 
    questions.splice(questionIndex, 1);
    acceptingAnswers = true; 
}

//so the 'click' registers and we can see what is being clicked in the inspector. 
choices.forEach( choice => {
      choice.addEventListener('click', e => {
          console.log(e.target);
          if(!acceptingAnswers) return;
          acceptingANswers = false;
          const selectedChoice = e.target; 
          const selectedAnswer = selectedChoice.dataSet['number']; 
         getNewQuestion(); 
      })
})

startGame();






//Score calculation 

// let score = 0;
// const correct_bonus = 10;

// if (answer = true) {
//     score += correct_bonus
// }
// document.getElementById("score").textContent = "Score: " + score;



// 10 Second Timer to run 5 seconds after question show

const timer = () => {
    let timeleft = 10;
let downloadTimer = setInterval(function(){
  timeleft -- ;
  document.getElementById("countdown").textContent = "Time Left: " + timeleft + "s";
  if(timeleft <= 0){
        clearInterval(downloadTimer);
    document.getElementById("countdown").textContent = "TIMES UP!"
  }
}, 1000);
}

setTimeout (function() {timer();}, 5000);

//Question status

// document.getElementById("questionCounter").textContent = questionCounter + "/10";