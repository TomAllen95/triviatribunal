const question = document.getElementById('question');
const choices = Array.from(document.getElementByClassName('choice-text'));
//questions are objects
let currentQuestion = {};
//set to true later, once question has finished being read.
let acceptingAnswers = false;
//player score
let score = 0;
//which question we are on
let questionCounter = 0;
//Our question Poule
let availableQuestions = [];
// let questions = [
//     {   
//         question: "On a dartboard, what number is directly opposite No. 1?",
//         choice1: 'a',
//         choice2: 'b',
//         choice3: 'c',
//         Answer: 'd'
//     },
//     {
//         question: "What is on display in the Madame Tussaud&#039;s museum in London?",
//         choice1: 'a',
//         choice2: 'b',
//         choice3: 'c',
//         Answer: 'd'
//     },
//     {
//         question: "What is the Spanish word for &quot;donkey&quot;?",
//         choice1: 'a',
//         choice2: 'b',
//         choice3: 'c',
//         Answer: 'd'
//     },
//     {
//         question: "Five dollars is worth how many nickles?",
//         choice1: 'a',
//         choice2: 'b',
//         choice3: 'c',
//         Answer: 'd'
//     },
//     {
//         question: "What do the letters of the fast food chain KFC stand for?",
//         choice1: 'a',
//         choice2: 'b',
//         choice3: 'c',
//         Answer: 'd'
//     },
//     {
//         question: "Which of the following presidents is not on Mount Rushmore?",
//         choice1: 'a',
//         choice2: 'b',
//         choice3: 'c',
//         Answer: 'd'
//     },
//     {
//         question: "What zodiac sign is represented by a pair of scales?",
//         choice1: 'a',
//         choice2: 'b',
//         choice3: 'c',
//         Answer: 'd'
//     },
//     {
//         question: "The likeness of which president is featured on the rare $2 bill of USA currency?",
//         choice1: 'a',
//         choice2: 'b',
//         choice3: 'c',
//         Answer: 'd'
//     },
//     {
//         question: "When someone is inexperienced they are said to be what color?",
//         choice1: 'a',
//         choice2: 'b',
//         choice3: 'c',
//         Answer: 'd'
//     },
//     {
//         question: "When someone is cowardly, they are said to have what color belly?",
//         choice1: 'a',
//         choice2: 'b',
//         choice3: 'c',
//         Answer: 'd'
//     }
// ]
//CONSTANTS
const correct_bonus = 10;
const max_Questions = 10;
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
        //go to the end page. what is in there is really a placeholder. it's whatever you call the 'Game over/Winner' page
        return window.location.assign('/end.html');
    }
    questionCounter++;
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
          getNewQuestion(); 
      })
})
startGame(); 

