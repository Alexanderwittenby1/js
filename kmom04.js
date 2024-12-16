import { center, info } from './modules/kmom04/helpers.js'
import { select } from './modules/kmom04/mouseevents.js'
import { move, resizeElement, changeColor } from './modules/kmom04/keyboardevents.js'
const box1 = document.getElementById('box1')

center()
info()
window.onresize = center

box1.addEventListener('click', function (event) {
  select(event.target)
})

document.addEventListener('keydown', function (event) {
  const key = event.key
  const step = 10

  switch (key) {
    case 'ArrowUp':
      move(0, -step)
      break

    case 'ArrowDown':
      move(0, step)
      break
    case 'ArrowLeft':
      move(-step, 0)
      break

    case 'ArrowRight':
      move(step, 0)
      break
  }
})

document.addEventListener('dblclick', function () {
  box1.classList.toggle('animateSize')
  box1.style.width = '2px'
  box1.style.height = '2px'

  window.setTimeout(function () {
    box1.remove()
  }, 2000)
})

// Här går vi igenom elementen som har classen circle eller selected.
// Toggle används för att ta bort en klass eller lägga till ifall den inte finns.

document.addEventListener('keydown', function (event) {
  if (event.key === 'e') {
    const elements = document.getElementsByClassName('selected')

    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.toggle('circle')
      elements[i].classList.toggle('selected')
    }
  }
})

// Här byter vi färg på de element som har klassen selected.

document.addEventListener('keydown', function (event) {
  const sizeChange = 10
  const elements = document.getElementsByClassName('selected')

  for (let i = 0; i < elements.length; i++) {
    if (event.key === 'q') {
      resizeElement(elements[i], sizeChange)
    } else if (event.key === 'w') {
      resizeElement(elements[i], -sizeChange)
    }
  }
})

// Byter färg på elementet med klassen selected.

document.addEventListener('keydown', function (event) {
  if (event.key === 'r') {
    const selectedElements = document.getElementsByClassName('selected')
    changeColor(selectedElements)
  }
})

document.addEventListener('keydown', function (event) {
  if (event.key === 't') {
    const selectedElements = document.querySelectorAll('.selected')

    selectedElements.forEach(function (originalElement) {
      // Skapa en kopia av det valda elementet
      const cloneElement = originalElement.cloneNode(true)

      cloneElement.addEventListener('click', function () {
        cloneElement.classList.toggle('selected')
        console.log('Klickade på klonat element!')
      })

      // Generera slumpmässiga positioner inom fönstret
      const maxX = window.innerWidth - cloneElement.offsetWidth
      const maxY = window.innerHeight - cloneElement.offsetHeight

      const randomX = Math.floor(Math.random() * maxX)
      const randomY = Math.floor(Math.random() * maxY)

      // Sätt den slumpmässiga positionen
      cloneElement.style.left = randomX + 'px'
      cloneElement.style.top = randomY + 'px'

      // Lägg till den klonade elementet i dokumentet
      document.body.appendChild(cloneElement)

      cloneElement.addEventListener('dblclick', function () {
        cloneElement.classList.toggle('animateSize')
        cloneElement.style.width = '2px'
        cloneElement.style.height = '2px'

        window.setTimeout(function () {
          cloneElement.remove()
        }, 2000)
      })
    })
  }
})

document.addEventListener('dblclick', function () {
  box1.classList.toggle('animateSize')
  box1.style.width = '2px'
  box1.style.height = '2px'

  window.setTimeout(function () {
    box1.remove()
  }, 2000)
})

document.addEventListener('keydown', function (event) {
  if (event.key === 'y') {
    const selectedElements = document.querySelectorAll('.selected')

    selectedElements.forEach(function (element) {
      element.parentNode.removeChild(element)
    })
  }
})

document.addEventListener('keydown', function (event) {
  if (event.key === 'u') {
    const selectedElements = document.querySelectorAll('.selected')

    selectedElements.forEach(function (element) {
      element.classList.remove('selected')
    })
  }
})

document.addEventListener('keydown', function (event) {
  if (event.key === 'i') {
    const selectAllElements = document.querySelectorAll('.box')

    selectAllElements.forEach(function (element) {
      element.classList.add('selected')
    })
  }
})

document.addEventListener('keydown', function (event) {
  if (event.key === 'p') {
    const randomElement = document.getElementById('box1').cloneNode(true)
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']

    const maxX = window.innerWidth - randomElement.offsetWidth
    const maxY = window.innerHeight - randomElement.offsetHeight

    const randomX = Math.floor(Math.random() * maxX)
    const randomY = Math.floor(Math.random() * maxY)

    randomElement.style.left = randomX + 'px'
    randomElement.style.top = randomY + 'px'

    const randomElementColor = colors[Math.floor(Math.random() * colors.length)]

    randomElement.style.backgroundColor = randomElementColor

    document.body.appendChild(randomElement)
  }
})

// Här är min egna.

document.addEventListener('keydown', function (event) {
  if (event.key === 'a') {
    const selectedElement = document.querySelector('.selected')
    if (selectedElement) {
      selectedElement.classList.add('jumping')

      setTimeout(function () {
        selectedElement.classList.remove('jumping')
      }, 500)
    }
  }
})
