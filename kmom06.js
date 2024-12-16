import { hangman, randomWord } from './modules/kmom06/hangman.js'

// Hämta orden.
const wordsJson = await hangman.wordlist()
const wrongLetters = []
const correctLetters = []
let letterCounter = 0
const clickedLetters = []

for (const part of hangman.validParts) {
  hangman.hide(part)
}

const activeWord = randomWord(wordsJson)
const keyboard = document.getElementById('keyboard')
console.log('Det aktiva ordet är:', activeWord)

keyboard.addEventListener('click', function (event) {
  if (event.target.classList.contains('letter')) {
    const clickedLetter = event.target.textContent

    if (activeWord.includes(clickedLetter)) {
      event.target.classList.add('clicked')
      for (let i = 0; i < activeWord.length; i++) {
        if (activeWord[i] === clickedLetter) {
          correctLetters.push(clickedLetter)
        }
      }
      console.log('the letter is correct', correctLetters)
    }

    if (clickedLetters.includes(clickedLetter)) {
      console.log('Letter already guessed')
    }

    if (correctLetters.length === activeWord.length) {
      document.body.style.backgroundColor = 'green'
      const youWon = document.createElement('div')
      youWon.textContent = 'You Won The Game!'
      youWon.style.fontSize = '50px'
      youWon.style.textAlign = 'center'
      youWon.style.textShadow = '2px 2px 2px black'
      youWon.style.top = '50%'
      youWon.style.left = '50%'
      keyboard.parentNode.removeChild(keyboard)
      document.body.appendChild(youWon)
    }

    if (!activeWord.includes(clickedLetter)) {
      event.target.classList.add('notCorrect')
      wrongLetters.push(clickedLetter)
      console.log('Felaktiga bokstäver: ', wrongLetters)
      letterCounter++
    }

    if (letterCounter === 1) {
      hangman.show('hill')
    }
    if (letterCounter === 2) {
      hangman.show('gallow')
    }
    if (letterCounter === 3) {
      hangman.show('body')
    }
    if (letterCounter === 4) {
      hangman.show('rightarm')
    }
    if (letterCounter === 5) {
      hangman.show('leftarm')
    }
    if (letterCounter === 6) {
      hangman.show('rightleg')
    }
    if (letterCounter === 7) {
      hangman.show('leftleg')
    }
    if (letterCounter === 8) {
      hangman.show('rope')
    }
    if (letterCounter === 9) {
      hangman.show('head')
      document.body.style.backgroundColor = 'red'

      const gameOverMessage = document.createElement('div')
      const theCorrectWord = document.createElement('div')
      theCorrectWord.textContent = 'The correct word was: ' + activeWord
      theCorrectWord.style.fontSize = '2em'

      gameOverMessage.textContent = 'Game Over ;('
      gameOverMessage.style.fontSize = '6em'
      gameOverMessage.style.color = 'black'
      gameOverMessage.style.textAlign = 'center'
      gameOverMessage.style.position = 'absolute'
      gameOverMessage.style.top = '50%'
      gameOverMessage.style.left = '50%'
      gameOverMessage.style.transform = 'translate(-50%, -50%)'
      gameOverMessage.style.textShadow = '2px 2px 2px black'
      document.body.appendChild(gameOverMessage)
      document.body.appendChild(theCorrectWord)
      keyboard.parentNode.removeChild(keyboard)
    }

    event.target.classList.add('clicked')
  }
})
