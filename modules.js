/**
 * Funktion that swaps the positions of two elements in an array.
 * @param {Array} array Array.
 * @returns {Array} Returns a shuffled array.
 */
function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
// Objektet som hanterar Memoryspelet.
const memory = {
  images: shuffleArray([
    {
      src: 'img/img1.jpg',
      desc: 'car'
    },
    {
      src: 'img/img2.jpg',
      desc: 'tree'
    },
    {
      src: 'img/img3.jpg',
      desc: 'cat'
    },
    {
      src: 'img/img4.jpg',
      desc: 'sun'
    },
    {
      src: 'img/img5.jpg',
      desc: 'ball'
    },
    {
      src: 'img/img6.jpeg',
      desc: 'bike'
    },
    {
      src: 'img/img7.jpg',
      desc: 'dog'
    },
    {
      src: 'img/img8.jpg',
      desc: 'bird'
    },
    {
      src: 'img/img9.jpg',
      desc: 'flower'
    }
  ]),
  guesses: [],
  current: null,
  reset: function () {
    this.current = null
    this.guesses = []
    this.points = 0
    this.start()
    document.querySelector('#show-score').style.display = 'none'
  },
  points: 0,
  addPoint: function () {
    this.points += 1
  },
  nextQuestion: function () {
    const notGuessedImages = this.images.filter(
      (image) => !this.guesses.includes(image.desc)
    )

    const item =
      notGuessedImages[Math.floor(Math.random() * notGuessedImages.length)]
    if (!item) {
      this.gameComplete()
      return
    }
    this.current = item
    this.guesses.push(item.desc)
  },
  displayQuestion: function () {
    const currentQuestion = document.querySelector('#question-text')
    currentQuestion.innerText = 'Under what card is the: ' + this.current.desc
  },
  openCard: function (index) {
    const images = document.querySelectorAll('.memory-image')
    images[index].style.display = 'block'
  },
  guess: function (index) {
    const answer = this.images[index].desc
    if (answer === this.current.desc) {
      this.correctGuess(index)
    } else {
      this.wrongGuess(index)
    }
  },

  correctGuess: function (index) {
    this.addPoint()
    this.openCard(index)
    this.nextQuestion()
    this.displayQuestion()
  },
  wrongGuess: function (index) {
    const imageContainers = document.querySelectorAll('.memory-image-container')
    imageContainers[index].style.backgroundColor = 'red'
    this.gameComplete()
  },
  gameComplete: function () {
    document.querySelector('#show-score').style.display = 'block'
    const imageContainers = document.querySelectorAll('.memory-image-container')
    imageContainers.forEach(
      (imageContainer) => (imageContainer.style.pointerEvents = 'none')
    )
  },
  hideCards: function () {
    const images = document.querySelectorAll('.memory-image')
    const imageContainers = document.querySelectorAll('.memory-image-container')

    imageContainers.forEach((imageContainer, index) => {
      imageContainer.addEventListener('click', () => this.guess(index))
    })
    images.forEach((image) => {
      image.style.display = 'none'
    })
  },

  start: function () {
    // Visa bilderna i 5 sekunder
    const imageContainer = document.getElementById('imageContainer')
    imageContainer.innerHTML = ''
    this.nextQuestion()
    this.displayQuestion()
    this.images.forEach((image) => {
      const imgDiv = document.createElement('div')
      const img = document.createElement('img')
      img.classList.add('memory-image')
      img.style.pointerEvents = 'none'
      imgDiv.classList.add('memory-image-container')
      imgDiv.style.backgroundColor = 'blue'
      img.src = image.src
      imgDiv.appendChild(img)
      imageContainer.appendChild(imgDiv)
    })

    setTimeout(() => {
      this.hideCards()
    }, 5000)
  }
}
// Objektet som hanterar FizzBuzz Spelet
const fizzBuzz = {
  points: 0,
  addPoint: function () {
    this.points += 1
  },
  reset: function () {
    this.points = 0
    document.querySelector('#start-memory').style.display = 'none'
    const options = document.querySelectorAll('.option')
    options.forEach((option) => {
      option.style.backgroundColor = '#04aa6d'
      option.style.pointerEvents = 'auto'
    })
  },

  start: function () {
    document.getElementById('fizzbuzz').style.display = 'none'
    document.getElementById('fizzbuzz-container').style.display = 'block'
    // Hitta containrar
    const fizzBuzzContainer = document.getElementById('fizzbuzz-container')
    const sequenceContainer = document.getElementById('sequence')
    const buttonsContainer = document.getElementById('buttons')

    // Frågetext
    const questionText = document.createElement('div')

    fizzBuzzContainer.appendChild(questionText)
    // Generera sekvens och korrekt  svar
    const randomSequence = this.fizzBuzzSequence()
    const correctAnswer = randomSequence[randomSequence.length - 1]

    // Visa sekvensen med ? på sista platsen
    const sequenceWithQuestion = [...randomSequence]
    sequenceWithQuestion[sequenceWithQuestion.length - 1] = '?'

    sequenceContainer.textContent = sequenceWithQuestion.join(' ')

    // Alternativ
    const options = this.generateRandomOptions(correctAnswer)

    // Skapa knappar
    for (let i = 0; i < 4; i++) {
      const button = document.createElement('button')
      button.classList.add('option')
      button.textContent = options[i]
      button.addEventListener('click', (event) =>
        this.guess(event, correctAnswer)
      )
      buttonsContainer.appendChild(button)
    }
  },

  guess: function (event, correctAnswer) {
    if (event.target.textContent === correctAnswer) {
      this.correctGuess(event.target)
    } else {
      this.wrongGuess(event.target)
    }
  },

  // Add point on correct guess
  correctGuess: function (button) {
    button.style.backgroundColor = 'blue'
    document.querySelector('#start-memory').style.display = 'block'
    this.addPoint()
  },

  wrongGuess: function (button) {
    button.style.backgroundColor = 'red'
    document.querySelector('#start-memory').style.display = 'block'

    const buttons = document.querySelectorAll('.option')
    buttons.forEach((button) => (button.style.pointerEvents = 'none'))
  },
  fizzBuzzSequence: function () {
    const startValue = Math.floor(Math.random() * 100) + 1
    const sequence = []
    for (let i = startValue; i < startValue + 10; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        sequence.push('FizzBuzz')
      } else if (i % 3 === 0) {
        sequence.push('Fizz')
      } else if (i % 5 === 0) {
        sequence.push('Buzz')
      } else {
        sequence.push(i.toString())
      }
    }

    return sequence
  },
  generateRandomOptions: function (correctAnswer) {
    const options = []

    // Generate 3 random options
    for (let i = 0; i < 3; i++) {
      const randomNum = Math.floor(Math.random() * 100) + 1

      let randomOption
      if (randomNum % 15 === 0) {
        randomOption = 'FizzBuzz'
      } else if (randomNum % 3 === 0) {
        randomOption = 'Fizz'
      } else if (randomNum % 5 === 0) {
        randomOption = 'Buzz'
      } else {
        randomOption = randomNum.toString()
      }
      options.push(randomOption)
      // Add correct answer

      if (!options.includes(correctAnswer)) {
        options.push(correctAnswer)
      }
    }

    // Shuffle the options array
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]]
    }

    return options
  }
}

// Objektet som hanterar knowledge spelet
const knowledge = {
  points: 0,
  questions: [],
  answeredQuestions: 0,
  addPoint: function () {
    this.points += 1
  },

  reset: function () {
    this.points = 0
    this.answeredQuestions = 0
    const options = document.querySelectorAll('.option')
    options.forEach((option) => {
      option.style.pointerEvents = 'auto'
      option.style.backgroundColor = '#04aa6d'
    })
    document.querySelector('#start-fizz-buzz').style.display = 'none'
  },
  correctAnswer: function (event) {
    event.target.style.backgroundColor = 'blue'
    this.addPoint()
  },
  wrongAnswer: function (event, optionGroup) {
    event.target.style.backgroundColor = 'red'
  },
  guess: function (event, correctAnswer, optionGroup) {
    this.answeredQuestions += 1
    if (event.target.textContent === correctAnswer) {
      this.correctAnswer(event)
    } else {
      this.wrongAnswer(event)
    }
    const options = document.querySelectorAll('.option-group-' + optionGroup)
    options.forEach((option) => (option.style.pointerEvents = 'none'))

    console.log(this.answeredQuestions, this.questions.length)
    if (this.answeredQuestions === this.questions.length) {
      document.querySelector('#start-fizz-buzz').style.display = 'block'
    }
  },
  start: async function () {
    const response = await fetch('../public/data/questions.json')
    const data = await response.json()
    this.questions = data
    const questionContainer = document.getElementById('question')
    for (let i = 0; i < this.questions.length; i++) {
      const div = document.createElement('div')
      const options = shuffleArray(this.questions[i].options)
      div.textContent = this.questions[i].question
      questionContainer.appendChild(div)

      // Skapa små boxar för varje svarsalternativ
      const optionsDiv = document.createElement('div')
      options.forEach((option) => {
        const optionButton = document.createElement('button')
        optionButton.textContent = option
        optionButton.classList.add('option')
        optionButton.classList.add('option-group-' + i)

        // Lägg till en klickhändelse för varje svarsalternativ
        optionButton.addEventListener('click', (event) =>
          this.guess(event, this.questions[i].correctAnswer, i)
        )

        optionsDiv.appendChild(optionButton)
      })
      questionContainer.appendChild(optionsDiv)
    }
  }
}
export { memory, fizzBuzz, knowledge }
