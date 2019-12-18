const question = document.getElementById('theQ');
const choiceA = document.getElementById('cardContentA');
const choiceB = document.getElementById('cardContentB');
const choiceC = document.getElementById('cardContentC');
const choiceD = document.getElementById('cardContentD');

const choices = [choiceA, choiceB, choiceC, choiceD];


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

let questionIndex = "";
//CONSTANTS
const correct_bonus = 10;
const max_Questions = 10;


startGame  = async () => {
    questionCounter = 1;
    score = 0;
                        //using the spread array with the ... basically, take this array, spread out its items and make a new array...if that makes sense?
    await fetch('http://localhost:3000/api').then( (response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                question.textContent = data.error;
            } else {
                questions = data;
                getNewQuestion();
            }
        })
    })

}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

getNewQuestion = () => {
    // if (questions.length === 0 || questionCounter > max_Questions){
    //     //go to the end page. what is in there is really a placeholder. it's whatever you call the 'Game over/Winner' page
    //     // return window.location.assign('/end.html');
    // }
    questionCounter++;
    // Randomly selects an index between 0 and 9 to select a random question from the array
    questionIndex = Math.floor(Math.random() * Math.floor(9));
    // Selects that questions and pushes it to the display
    currentQuestion = questions.questions[questionIndex].question;
    question.textContent = "Q. " + currentQuestion;
    
    // puts all the answers for this question into an array
    answers = [questions.questions[questionIndex].correctAnswer, questions.questions[questionIndex].wrongAnswer1, questions.questions[questionIndex].wrongAnswer2, questions.questions[questionIndex].wrongAnswer3]
    // shuffles the answers and pushes these to the display
    shuffledAnswers = shuffle(answers)
    choiceA.textContent = shuffledAnswers[0]
    choiceB.textContent = shuffledAnswers[1]
    choiceC.textContent = shuffledAnswers[2]
    choiceD.textContent = shuffledAnswers[3]

    //this will take the questions array and remove the question we just used. 
    questions.questions.splice(questionIndex, 1);
    


    // choices.forEach( choice => {
    //     const number = choice.dataSet['number'];
    //     choice.textContent = currentQuestion ['choice' + number];
    // });
    // //this will take the availableQuestions array and remove the question we just used. 
    // questions.splice(questionIndex, 1);
    acceptingAnswers = true; 
}

//so the 'click' registers and we can see what is being clicked in the inspector. 
choices.forEach( choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target; 
        // const selectedAnswer = selectedChoice.dataSet['number']; 
        const classToApply = 
          selectedChoice == questions.questions[questionIndex].correctAnswer ? "correct" : "incorrect";
          if(classToApply == "correct") {
              incrementScore(correct_bonus);
          }
      selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(() => {
          selectedChoice.parentElement.classList.remove(classToApply);
          getNewQuestion();
      }, 1000);
    });
});
incrementScore = num => {
  score += num; 
  scoreText.innerText = score;
}

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

document.getElementById("questionCounter").textContent = "Question: " + questionCounter + "/10";


//direct to register/login page
document.getElementById("")


