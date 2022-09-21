// declared variables
const startButton = document.getElementById('play');
const quizSecEl = document.getElementsByClassName('questions');
const infoSection = document.getElementById('infobox');
const timerEl = document.getElementById('timerbox');
let timerCounter = document.getElementsByClassName('timersec')[0]
const scoreEl = document.getElementsByClassName('score')[1]
let points = document.querySelector('#points');
let incorrectText = document.querySelectorAll('.incorrect');
const gameOver = document.getElementById('GG');
const formInput = document.getElementById('form');




startButton.addEventListener('click', play)
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
      scoreEl.innerHTML = 'You got ' + score + "/5 questions correct!";
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

