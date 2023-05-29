'use strict';

let message = document.querySelector('.message')
const number = document.querySelector('.number')
let score = document.querySelector('.score')
let score_number = Number(score.textContent)
let highscore = document.querySelector('.highscore')
let highscore_number = Number(highscore.textContent)
const guess = document.querySelector('.guess')
const btn_check = document.querySelector('.check')
const btn_again = document.querySelector('.again')
const body = document.querySelector('body')

// Make a function to random a number between 1 & 20
function randomFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min)
}
// randomize number.value between 1 & 20
number.value = randomFromInterval(1, 20)

// Logging guess input value
guess.addEventListener('change', (event) => {
    console.log('guess value\n', event.target.value) 
})

// For 'Check!' button logic
function returnGuess() {
    if (Number(guess.value) > 20 || Number(guess.value) < 0 || Number(guess.value) === 0 || guess.value.includes('.')) {
        message.textContent = 'Guess must be between 1 and 20!'
    } else if (Number(guess.value) > number.value) {
        message.textContent = 'Too HIGH!'
        // After each fail guess, score - 1
        // score.textContent does not reflect score changes
        // To reflect score changes in our code
        // Store score.textContent = Number(score.textContent)
        score.textContent = (score_number-=1).toString()
    } else if (Number(guess.value) < number.value) {
        message.textContent = 'Too LOW!'
        // After each fail guess, score - 1
        score.textContent = (score_number-=1).toString()
        // When player wins
        // Correct if guess = number
    } else if (Number(guess.value) === number.value) {
        message.textContent = 'Correct Answer! Congrats!'
        // Reveal secret number
        number.textContent = guess.value
        // Change body.style.background color to green
        body.style.backgroundColor = "#60b347"
        // Make secret number larger upon winning
        number.style.width = '30rem'
        // Storing Highscore 
        if (Number(score.textContent) > Number(highscore.textContent)) {
            highscore.textContent = score.textContent
        }
        
    } 
    
    // When score = 0 --> Losing game
    if (score_number === 0) {
        // Telling player about losing game
        message.textContent = 'Game Over! You lost'
        // Telling player about losing game
        number.textContent = ':('
        // If score reaches 0, disable Check! button
        btn_check.disabled = true
    } else if (score_number < 1) {
        // Never allow score going below 0
        btn_check.disabled = true
    }
    
}

btn_check.addEventListener('click', returnGuess)

// button 'Again!' logic
function resetGame() {
    // Re-randomize number.value on next round
    number.value = randomFromInterval(1, 20)
    message.textContent = 'Start guessing...'
    // Change back body.style.backgroundColor to black
    body.style.backgroundColor = "#222"
    // Emptying guess input
    guess.value = ''
    // Declaring score.textContent = 20
    score.textContent = Number('20').toString()
    // Storing score in our code
    score_number = Number(score.textContent)
    // Reactivate 'Check!' button
    btn_check.disabled = false
    // Change Secret number back to ?
    number.textContent = '?'
    // Change Secret number width back to normal
    number.style.width = '15rem'
    // Logging
    console.log('message.textContent\n', message.textContent)
    console.log('guess.value\n', guess.value)
    console.log('score.textContent\n', score.textContent)
    console.log('highscore.textContent\n', highscore.textContent)
    console.log('number.textContent\n', number.textContent)
}

btn_again.addEventListener('click', resetGame)