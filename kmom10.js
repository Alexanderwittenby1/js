import { memory, fizzBuzz, knowledge } from './modules/kmom10/modules.js'

let currentGame = ''
document.querySelector('#start-test').addEventListener('click', startTheTest)
document
  .querySelector('#start-fizz-buzz')
  .addEventListener('click', nextQuestion)
document
  .querySelector('#start-memory')
  .addEventListener('click', startMemoryGame)
document
  .querySelector('#show-score')
  .addEventListener('click', showCompletePage)

/**
 * Function that starts the knowledge game.
 */
export function startTheTest () {
  console.log('Startar iqtestet.')
  document.getElementById('start-container').style.display = 'none'
  document.getElementById('question-container').style.display = 'block'
  document.getElementById('result-container').style.display = 'block'
  currentGame = 'knowledge'
  knowledge.start()
}

/**
 * Function that moves to the next test.
 */
function nextQuestion () {
  document.getElementById('question-container').style.display = 'none'
  document.getElementById('result-container').style.display = 'none'
  // document.getElementById("fizzbuzz").style.display = "block";
  currentGame = 'fizzBuzz'
  fizzBuzz.start()
}

/**
 * Function that starts the memory game.
 */
function startMemoryGame () {
  document.getElementById('fizzbuzz-container').style.display = 'none'
  document.getElementById('memory-test').style.display = 'flex'
  currentGame = 'memory'
  memory.start()
}

window.reset = function () {
  if (currentGame === 'knowledge') {
    knowledge.reset()
  }
  if (currentGame === 'fizzBuzz') {
    fizzBuzz.reset()
  }
  if (currentGame === 'memory') {
    memory.reset()
  }
}

/**
 * Resets the current game when using window.reset() in the console.
 */
async function showCompletePage () {
  document.querySelector('#complete-container').style.display = 'flex'
  document.querySelector('#memory-test').style.display = 'none'
  const scoreElement = document.querySelector('#score')
  const scoreMessage = document.querySelector('#score-message')
  const pointMultiplier = 3
  const fizzBuzzMaxPoints = 1
  const memoryMaxPoints = memory.images.length
  console.log(knowledge.points, fizzBuzz.points, memory.points)
  console.log(knowledge.questions.length, fizzBuzzMaxPoints, memoryMaxPoints)

  const score =
    (knowledge.points + fizzBuzz.points + memory.points) * pointMultiplier
  const maxScore =
    (knowledge.questions.length + fizzBuzzMaxPoints + memoryMaxPoints) *
    pointMultiplier
  scoreElement.textContent = `${score} of (${maxScore})`
  scoreMessage.textContent = getScoreMessage(score, maxScore)
}

/**
 * Function that shows the final score and message.
 * @param {number} score The total score the player got.
 * @param {number} maxScore The maximum score the player could get.
 * @returns {string} A message.
 */
function getScoreMessage (score, maxScore) {
  const percentage = (score / maxScore) * 100
  if (percentage < 50) {
    return 'Under 50% correct, keep practicing!'
  } else if (percentage < 75) {
    return 'Over 50% correct, nice work! Room for improvement though.'
  } else if (percentage < 100) {
    return 'Over 75% correct, well done!'
  } else {
    return 'Perfect score, excellent work!'
  }
}
