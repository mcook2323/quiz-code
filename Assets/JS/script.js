// Creating all of the variables including the array of questions

let questions = [
  {prompt: 'Which of the following methods is used to access HTML elements using Javascript?',
    options: [
      'getElementById()',
      'getElementByClassName()',
      'Both A and B',
      'None of the Above'
    ],
    answer: 'Both A and B',
  },
  {prompt: 'Which of the following methods can be used to display data in some form using Javascript?',
  options: [
    'document.write()',
    'console.log()',
    'window.alert()',
    'All of the Above'
  ],
  answer: 'All of the Above',
},
  {prompt: 'How can a datatype be declared to be a constant type?',
  options: [
    'const',
    'var',
    'let',
    'constant'
  ],
  answer: 'const',
},
  {prompt: 'When an operator’s value is NULL, the typeof returned by the unary operator is:',
  options: [
    'Boolean',
    'Undefined',
    'Object',
    'Integer'
  ],
  answer: 'Object',
},
  {prompt: 'What does the Javascript “debugger” statement do?',
  options: [
    'It will debug all the errors in the program at runtime',
    'It acts as a breakpoint in a program',
    'It will debug error in the current statement if any',
    'All of the Above'
  ],
  answer: 'It acts as a breakpoint in a program',
},
];

let viewHighScore = document.getElementById('view-highscore');
let timerEl = document.getElementById('timer');
let startQuizEl = document.getElementById('quiz-start');
let startScreenEl = document.getElementById('start-screen');
let startBtn = document.getElementById('start');
let questionsEl = document.getElementById('questions');
let choicesEl = document.getElementById('options')
let quizEndEl = document.getElementById('quiz-end');
let finalScoreEl = document.getElementById('final-score');
let nameEl = document.getElementById('name')
let submitScoreEl = document.getElementById('submit-score');
let feedbackEl = document.getElementById('feedback');
let scoreResultsEl = document.getElementById('score-results');
let tryAgainBtn = document.getElementById('try-again');
let restartBtn = document.getElementById('restart-btn');
let clearScores = document.getElementById('clear-scores');

let timer = questions.length * 15;
let currentQuestionIndex = 0
let timerId;

// Getting the question and running through the array of choices
function getQuestion(){
  let currentQuestion = questions[currentQuestionIndex];
  let promptEl = document.getElementById('question-selection');
  promptEl.textContent = currentQuestion.prompt;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(
    function (choice, i){
      let choiceBtn = document.createElement('button');
      choiceBtn.setAttribute("value", choice);
      choiceBtn.textContent = i + 1  + ". " + choice;
      choiceBtn.onclick = questionClick;
      choicesEl.appendChild(choiceBtn);
    }
  )
}

//Starting the quiz with the timer and hiding the start screen
function quizStart(){
  timerId = setInterval(
    clock,
    1000)
    timerEl.textContent = timer
    if(timer <= 0){
      clearInterval(timerId);
      timerEl.textContent = 0
    }
  
  
  startScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  getQuestion()
}

// Providing the feedback and removing 5 seconds for every wrong answer
function questionClick(){
  feedbackEl.classList.remove('hide');
  if(this.value !==  questions[currentQuestionIndex].answer){
    timer -= 5;
    if(timer < 0){
      timer = 0
    }
    timerEl.textContent = timer;
    
    feedbackEl.textContent = `Wrong Answer! The correct answer was ${questions[currentQuestionIndex].answer}.`;
    feedbackEl.style.color = 'red';
  }else {
    feedbackEl.textContent = 'Correct!';
    feedbackEl.style.color = 'green';
  }
  
  currentQuestionIndex++;
  if(currentQuestionIndex === questions.length)
{
  quizEnd()
  } else {  getQuestion();
}

}


// presenting the final score as the remaining amount of time left
function quizEnd(){
    clearInterval(timerId);
    quizEndEl.removeAttribute('class'); 
    let finalScoreEl = document.getElementById('final-score');
    finalScoreEl.textContent = timer;
    questionsEl.setAttribute('class', 'hide');
    feedbackEl.setAttribute('class', 'hide');
}

function clock(){
  timer--; 
    timerEl.textContent = timer; 
    if (timer <= 0) { 
        quizEnd(); 
    } 
} 

// Saving the high score in the local storage
function saveHighscore() { 
  let name = nameEl.value.trim(); 
  if (name !== "") { 
      var highscores = 
          JSON.parse( 
              window.localStorage.getItem( 
                  "highscores"
              ) 
          ) || []; 
      var newScore = { 
          score: timer, 
          name: name, 
      }; 
      highscores.push(newScore); 
      window.localStorage.setItem( 
          "highscores", 
          JSON.stringify(highscores) 
      ); 
      alert( 
          "Your Score has been Submitted"
      ); 
      submitScoreEl.setAttribute('class', 'hide')
  } else {
    alert('Please submit your name')
  }
  
  
 
} 

function checkForEnter(event){
  if (event.key === 'enter'){
    saveHighscore();
    alert('Your Score has been submitted');
  }
}


// Displaying the Highscores in the results area
function printHighscores() { 
  quizEndEl.setAttribute('class', 'hide');
  startQuizEl.setAttribute('class', 'hide');
  questionsEl.setAttribute('class', 'hide');
  feedbackEl.setAttribute('class', 'hide')
  scoreResultsEl.classList.remove('hide');
  let scoreInfo = JSON.parse(localStorage.getItem('highscores'));
  for (let index = 0; index < scoreInfo.length; index++) {
    const initEl = document.createElement('li');
    initEl.textContent = 'Name: ' + scoreInfo[index].name + ' - Score: ' + scoreInfo[index].score;
    let resultsLoad = document.getElementById('results-load')
    resultsLoad.appendChild(initEl);
    
  }
} 



function tryAgain(){
  location.reload(true)
}

function clearScore(){
  window.localStorage.removeItem('highscores');
  window.location.reload();
}
document.getElementById('clear-all').onclick = clearScore;


nameEl.onkeyup = checkForEnter;
submitScoreEl.onclick = saveHighscore;
startBtn.addEventListener('click', quizStart);
viewHighScore.onclick = printHighscores;
tryAgainBtn.onclick = tryAgain;
restartBtn.onclick = tryAgain;

