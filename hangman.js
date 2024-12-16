/**
 * @module hangman
 */

const hangman = {
  partAsElement: {
    hill: document.getElementById('hang_hill'),
    gallow: document.getElementById('hang_construction'),
    body: document.getElementById('hang_body'),
    rightarm: document.getElementById('hang_rightarm'),
    leftarm: document.getElementById('hang_leftarm'),
    rightleg: document.getElementById('hang_rightleg'),
    leftleg: document.getElementById('hang_leftleg'),
    rope: document.getElementById('hang_rope'),
    head: document.getElementById('hang_head')
  },
  validParts: [
    'hill',
    'gallow',
    'body',
    'rightarm',
    'leftarm',
    'rightleg',
    'leftleg',
    'rope',
    'head'
  ],
  wrongLetters: [],
  correctLetters: [],
  isValid: function (part) {
    if (this.validParts.indexOf(part) === -1) {
      console.log('The part is not valid: ' + part)
      return false
    }
    console.log('The part is valid: ' + part)
    return true
  },

  hide: function (part) {
    if (this.isValid(part)) {
      console.log('Hiding part: ' + part)
      this.partAsElement[part].style.display = 'none'
    }
  },

  show: function (part) {
    if (this.isValid(part)) {
      console.log('Showing part: ' + part)
      this.partAsElement[part].style.display = 'inline'
    }
  },

  wordlist: async function () {
    const wordsURL = '../public/data/words.json'
    try {
      const response = await fetch(wordsURL)
      if (!response.ok) {
        throw new Error(`Unable to fetch data. Status code: ${response.status}`)
      }
      const wordsJson = await response.json()
      console.log(wordsJson)
      return wordsJson
    } catch (error) {
      console.error('An error occurred:', error.message)
      return null
    }
  },

  peek: function (activeWord) {
    console.log('Active word:', activeWord)
  }

}

/**
 * Funtion that picks a random word from words.json.
 * @param {object} wordsJson  The words.json object.
 * @returns {string} Returns the random word.
 */
function randomWord (wordsJson) {
  const randomIndex = Math.floor(Math.random() * wordsJson.length)
  const randomWord = wordsJson[randomIndex]
  return randomWord
}

// In hangman module

export { hangman, randomWord }
