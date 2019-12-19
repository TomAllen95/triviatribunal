const question = document.getElementById('theQ');
const choiceA = document.getElementById('cardContentA');
const choiceB = document.getElementById('cardContentB');
const choiceC = document.getElementById('cardContentC');
const choiceD = document.getElementById('cardContentD');

const button = document.getElementById('button');



const url_string = window.location.href;
const url = new URL(url_string);
let category = url.searchParams.get("Category");
let difficulty = url.searchParams.get("Difficulty");

const choices = document.getElementsByClassName("answer");

const gameStart = document.getElementById('form');

const topic = document.getElementById('CategorySelector');
const level = document.getElementById('DifficultySelector');


let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let questions = [];
let questionIndex = "";
let correctAnswer = "";
let correct_bonus = "";

if (difficulty == "easy"){ 
    correct_bonus = 10
} else if (difficulty == "medium"){
    correct_bonus = 20
} else if (difficulty == "hard"){
    correct_bonus = 30
};

if( document.querySelector('#GameChoiceSubmit') ) {
    document.querySelector('#GameChoiceSubmit').addEventListener('click', () => {
        select();
    });
}

const select = (e) => { 

    if (topic.value == "general knowledge") {
        category = 9
    } else if (topic.value == "mythology"){
        category = 20
    } else if (topic.value == "animals"){
        category = 27
    }
    difficulty = level.value.toLowerCase();
};

const startGame = async () => {
    if (category == "general knowledge") {
        category = 9
    } else if (category == "mythology"){
        category = 20
    } else if (category == "animals"){
        category = 27
    }
    fetch('http://localhost:3000/api?category='+ category +'&difficulty=' + difficulty + "&type=multiple").then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.log(data.error);
                        if(question) {
                            question.textContent = data.error;
                        }
                    } else {
                        questions = data;
                            if(question) {
                                getNewQuestion();
                            }
                    }
                })
            });
};

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

function unhide() {
    choices.style.visibilty = 'hidden';
    button.style.visibilty = 'visible';
    
}

getNewQuestion = () => {
    if (questionCounter == 10) {
        question.textContent = "Game Over! Your score is " + score;
        unhide();
    }
    questionCounter++;
    // Randomly selects an index between 0 and 9 to select a random question from the array
    questionIndex = Math.floor(Math.random() * questions.questions.length);
    // Selects that questions and pushes it to the display
    currentQuestion = questions.questions[questionIndex].question;
    question.textContent = "Q. " + currentQuestion;

    // puts all the answers for this question into an array
    answers = [questions.questions[questionIndex].correctAnswer, questions.questions[questionIndex].wrongAnswer1, questions.questions[questionIndex].wrongAnswer2, questions.questions[questionIndex].wrongAnswer3]
    // shuffles the answers and pushes these to the display

    correctAnswer = questions.questions[questionIndex].correctAnswer;

    shuffledAnswers = shuffle(answers)
    choiceA.textContent = shuffledAnswers[0]
    choiceB.textContent = shuffledAnswers[1]
    choiceC.textContent = shuffledAnswers[2]
    choiceD.textContent = shuffledAnswers[3]

    //this will take the questions array and remove the question we just used. 
    questions.questions.splice(questionIndex, 1);

    update();
    restartTimer();
    timer();
}

//so the 'click' registers and we can see what is being clicked in the inspector. 
for (var i = 0; i < choices.length; i++) {
choices[i].addEventListener('click', e => {
    const selectedChoice = e.target;
    userAnswer = selectedChoice.textContent.trim();

    if (userAnswer == correctAnswer) {
        RightOrWrong("GreenTick");
        score += correct_bonus;
        scoreUpdate();
    }
    else 
    {
        RightOrWrong("RedCross");
    }
    console.log(userAnswer)
    console.log(correctAnswer)

    setTimeout(function () { 
        getNewQuestion(); 
    }, 1000);
});
};

// 15 Second Timer to run on display of each question

let cdTimer; 

const timer = () => {
    let timeleft = 15;
    cdTimer = setInterval(function () {
        timeleft--;
        document.getElementById("countdown").textContent = "Time Left: " + timeleft + "s";
        if (timeleft <= 0) {
            clearInterval(cdTimer);
            document.getElementById("countdown").textContent = "TIMES UP!"
            getNewQuestion();
        }
    }, 1000);
}

const restartTimer = () => {
    clearInterval(cdTimer);
  }

//Question status
const update = () => {
    document.getElementById("questionCounter").textContent = "Question: " + questionCounter + "/10";
}

// Score increment
const scoreUpdate = () => {
    document.getElementById("score").textContent = "Score: " + score;
}

function RightOrWrong(cssID)
{
    document.getElementById(cssID).classList.add("animated");
    setTimeout(function() {
        document.getElementById(cssID).classList.remove("animated");
    }, 1000);
}

startGame();

// button.addEventListener('click', () => {
//     updateScore
// }

