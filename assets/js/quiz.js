// declared variables
const startButton = document.getElementById('play')
const quizSecEl = document.getElementsByClassName('questions')
const infoSection = document.getElementById('infobox')
const timerEl = document.getElementById('timerbox')
const scoreEl = document.getElementsByClassName('score')[1]
const gameOver = document.getElementById('GG')
const formInput = document.getElementById('form')
const highscore = document.getElementById('highscore')
const output = document.getElementById('output')
const restartButton = document.getElementById('playAgain')

let points = document.querySelector('#points')
let incorrectText = document.querySelectorAll('.incorrect')
let timerCounter = document.getElementsByClassName('timersec')[0]



startButton.addEventListener('click', play)
formInput.addEventListener('submit', submitScore)
restartButton.addEventListener('click', restart)

let score = 0
let time = 25
let intervalId
let nextQuestion = 0
// When the user clicks the start button function play will hide the info section and start the
// quiz, the timer will be set
function play () {
  infoSection.setAttribute('style', 'display: none')
  quizSecEl[nextQuestion].setAttribute('style', 'display: block')
  timerEl.setAttribute('style', 'display: block')
  intervalId = setInterval(timerCountDown, 1000)
}

// once the user clicks an answer this function will check the answer to see if it is true or false then adds a point
// if correct and subtract time if incorrect
function checkAnswers (event) {
  if (event.target.getAttribute('data-correct') === 'true') {
    console.log('answer is correct')
    score += 1
    points.textContent = score
    incorrectText[nextQuestion].textContent = 'correct'
  } else {
    console.log('answer is wrong')
    time -= 3
    incorrectText[nextQuestion].textContent = 'wrong'
  }
  setTimeout(function () {
    quizSecEl[nextQuestion].setAttribute('style', 'display: none')
    incorrectText[nextQuestion].setAttribute('style', 'display: none')
    nextQuestion++
    //once all the questions are less than 5 then everything will display to none
    if (nextQuestion < 5) {
      quizSecEl[nextQuestion].setAttribute('style', 'display: block')
      incorrectText[nextQuestion].setAttribute('style', 'display: block')
    }
    //once 5 questions have cycled they game will come to an end displaying the submit form aswell as the total score
    if (nextQuestion === 5) {
      timerEl.setAttribute('style', 'display: none')
      gameOver.setAttribute('style', 'display: block')
      scoreEl.innerHTML = 'You got ' + score + '/5 questions correct!'
      formInput.setAttribute('style', 'display: block')
    }
  }, 1000)

  console.log('button was clicked')
  console.log(event.target.getAttribute('data-correct'))
}
//this timer will start once the user starts the game counting down from 25 until it reaches 0 then time is up
function timerCountDown () {
  console.log('countdown!!!')
  if (time > 0) {
    timerCounter.innerHTML = time--
  } else {
    timerCounter.innerHTML = 'Times up!'
    clearInterval(intervalId)
  }
}
//submit info to highscores
function submitScore (event) {
  event.preventDefault()
  let initials = event.target[0].value
  // 1. AB - 22
  console.log(initials)
  let scoreText = localStorage.length + 1 + '. ' + initials + ' - ' + score
  localStorage.setItem(localStorage.length, scoreText)

  highscore.setAttribute('style', 'display: flex')
  let scores = ''
  for (let i = 0; i < localStorage.length; i++) {
    scores += localStorage.getItem(i) + '\n'
  }
  output.innerHTML = scores
  event.target[0].value = ''
  formInput.setAttribute('style', 'display: none')
  gameOver.setAttribute('style', 'display: none')
}
//restarts the game 
function restart () {
  highscore.setAttribute('style', 'display: none')
  infoSection.setAttribute('style', 'display: block')
  score = 0
  time = 25
  nextQuestion = 0
  points.textContent = score
}
