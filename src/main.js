// const question = document.getElementById('question');
// const choices = Array.from(document.getElementByClassName('choice-text'));
// //questions are objects
// let currentQuestion = {};
// //set to true later, once question has finished being read.
// let acceptingAnswers = false;
// //player score
// let score = 0;
// //which question we are on
// let questionCounter = 0;
// //Our question Poule
// let availableQuestions = [];
// // let questions = [
// //     {   
// //         question: "On a dartboard, what number is directly opposite No. 1?",
// //         choice1: 'a',
// //         choice2: 'b',
// //         choice3: 'c',
// //         Answer: 'd'
// //     },
// //     {
// //         question: "What is on display in the Madame Tussaud&#039;s museum in London?",
// //         choice1: 'a',
// //         choice2: 'b',
// //         choice3: 'c',
// //         Answer: 'd'
// //     },
// //     {
// //         question: "What is the Spanish word for &quot;donkey&quot;?",
// //         choice1: 'a',
// //         choice2: 'b',
// //         choice3: 'c',
// //         Answer: 'd'
// //     },
// //     {
// //         question: "Five dollars is worth how many nickles?",
// //         choice1: 'a',
// //         choice2: 'b',
// //         choice3: 'c',
// //         Answer: 'd'
// //     },
// //     {
// //         question: "What do the letters of the fast food chain KFC stand for?",
// //         choice1: 'a',
// //         choice2: 'b',
// //         choice3: 'c',
// //         Answer: 'd'
// //     },
// //     {
// //         question: "Which of the following presidents is not on Mount Rushmore?",
// //         choice1: 'a',
// //         choice2: 'b',
// //         choice3: 'c',
// //         Answer: 'd'
// //     },
// //     {
// //         question: "What zodiac sign is represented by a pair of scales?",
// //         choice1: 'a',
// //         choice2: 'b',
// //         choice3: 'c',
// //         Answer: 'd'
// //     },
// //     {
// //         question: "The likeness of which president is featured on the rare $2 bill of USA currency?",
// //         choice1: 'a',
// //         choice2: 'b',
// //         choice3: 'c',
// //         Answer: 'd'
// //     },
// //     {
// //         question: "When someone is inexperienced they are said to be what color?",
// //         choice1: 'a',
// //         choice2: 'b',
// //         choice3: 'c',
// //         Answer: 'd'
// //     },
// //     {
// //         question: "When someone is cowardly, they are said to have what color belly?",
// //         choice1: 'a',
// //         choice2: 'b',
// //         choice3: 'c',
// //         Answer: 'd'
// //     }
// // ]
// //CONSTANTS
// const correct_bonus = 10;
// const max_Questions = 10;
// startGame = () => {
//     questionCounter = 0;
//     score = 0;
//                         //using the spread array with the ... basically, take this array, spread out its items and make a new array...if that makes sense?
//     avaialableQuestions = [...questions];
//     console.log(availableQuestions);
//     getNewQuestion();
// }
// getNewQuestion = () => {
//     if(availableQuestions.length === 0 || questionCounter > max_Questions){
//         //go to the end page. what is in there is really a placeholder. it's whatever you call the 'Game over/Winner' page
//         return window.location.assign('/end.html');
//     }
//     questionCounter++;
//     const questionIndex = Math.floor(Math.random() * availableQuestions.length);  
//     currentQuestion = availableQuestions[questionsIndex];
//     question.innerText = currentQuestion.question;
//     choices.forEach( choice => {
//         const number = choice.dataSet['number'];
//         choice.innerText = currentQuestion ['choice' + number];
//     });
//     //this will take the availableQuestions array and remove the question we just used. 
//     availableQuestions.splice(questionIndex, 1);
//     acceptingAnswers = true; 
// }
// //so the 'click' registers and we can see what is being clicked in the inspector. 
// choices .forEach( choice => {
//       choice.addEventListener('click', e => {
//           console.log(e.target);
//           if(!acceptingAnswers) return;
//           acceptingANswers = false;
//           const selectedChoice = e.target; 
//           const selectedAnswer = selectedChoice.dataSet['number']; 
//           getNewQuestion(); 
//       })
// })
// startGame(); 





const question = document.getElementById('question');
const choices = Array.from(document.getElementByClassName('choice-text'));
//the two Texts below are for the question counter and score in the css/html. Names can be changed to whatever they have been made. They are just there for when/if we use them.
// const questionCounterText  = document.getElementById('questionCounter');
const playerScoreText = document.getElementById('playerScore');

//questions are objects
let currentQuestion = {};

//set to true later, once question has finished being read.
let acceptingAnswers = false;

//player score
let playerScore = 0;

//which question we are on
let questionCounter = 0;

//Our question Poule
let availableQuestions = [];

let questions = [];
    
//this is the API
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestions = {
                questions: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestions.incorrect_answers];
            formattedQuestions.answer = Math.floor(Math.random * 3) +1;
            answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

            answerChoices.forEach((choice, index) => {
                formattedQuestiion["choice" + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        
        //startGame is here so that it doesn't start automatically on opening
        startGame();
    })
    .catch(err => {
        console.log(err);
    })

//CONSTANTS

const correct_bonus = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
                        //using the spread array with the ... basically, take this array, spread out its items and make a new array...if that makes sense?
    avaialableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > max_Questions){
        //go to the end page. /end.html is really a placeholder. it's whatever you call the 'Game Over' page
        return window.location.assign('/end.html');
    }

    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + max_Questions;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);  
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataSet['number'];
        choice.innerText = currentQuestion ['choice' + number];
    });
    
    //this will take the availableQuestions array and remove the question we just used. 
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true; 
}

//so the 'click' registers and we can see what is being clicked in the inspector. 
choices .forEach( choice => {
      choice.addEventListener('click', e => {
          console.log(e.target);
          if(!acceptingAnswers) return;

          acceptingANswers = false;

          const selectedChoice = e.target; 
          const selectedAnswer = selectedChoice.dataSet['number']; 

          //checks to see if the selected answer is correct. If correct is changes to correct. otherwise remains incorrect. 
          const classToApply = 'incorrect';
          if(selectedAnswer == currentQuestion.Answer){
              classToApply = 'correct';
          }   

          if(classToApply === 'correct') {
              incremenetScore(correct_bonus);
          }

          selectedChoice.parentElement.classList.add('classToApply');

          //this is waiting for 1,000 milliseconds after choosing an answer to load the next question. 
          setTimeout( () => {
            selectedChoice.parentElement.classList.remove('classToApply');
            getNewQuestion(); 

          }, 1000);
          
          
      })
})

incremenetScore = num => {
    score += num;
    scoreText.innerText = score; 
}





 