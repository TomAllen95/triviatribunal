const question = document.getElementById('theQ');
const choiceA = document.getElementById('cardContentA');
const choiceB = document.getElementById('cardContentB');
const choiceC = document.getElementById('cardContentC');
const choiceD = document.getElementById('cardContentD');
const button = document.getElementById('button');
let choices = document.getElementsByClassName("choices");

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let questions = [];
let questionIndex = "";
let correctAnswer = "";
const correct_bonus = 10;

startGame = async () => {
    await fetch('http://localhost:3000/api').then((response) => {
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

    // setInterval (timer())
}

//so the 'click' registers and we can see what is being clicked in the inspector. 
document.addEventListener('click', e => {
    const selectedChoice = e.target;
    userAnswer = selectedChoice.textContent.trim();

    if (userAnswer == correctAnswer) {
        score += correct_bonus;
        scoreUpdate();
    }
    console.log(userAnswer)
    console.log(correctAnswer)

    setTimeout(function () { 
        getNewQuestion(); 
    }, 1000);
});

startGame();


// 15 Second Timer to run on display of each question

const timer = () => {
    let timeleft = 15;
    let downloadTimer = setInterval(function () {
        timeleft--;
        document.getElementById("countdown").textContent = "Time Left: " + timeleft + "s";
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("countdown").textContent = "TIMES UP!"
            getNewQuestion();
        }
    }, 1000);
}

//Question status
const update = () => {
    document.getElementById("questionCounter").textContent = "Question: " + questionCounter + "/10";
}

// Score increment
const scoreUpdate = () => {
    document.getElementById("score").textContent = "Score: " + score;
}



// button.addEventListener('click', () => {
//     updateScore
// }

