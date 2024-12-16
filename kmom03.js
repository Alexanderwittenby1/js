// js/kmom03.js
import { colors, persons, years } from './modules/kmom03/info.js'
const container = document.getElementById('container')
const myButton = document.getElementById('myButton')
let clickCount = 0
const myimg = 'img/logo.png'

myButton.addEventListener('click', function (event) {
  if (clickCount < persons.length) {
    if (clickCount % 4 === 0) {
      const row = document.createElement('div')
      row.className = 'row'
      container.appendChild(row)
    }
    const temp = document.createElement('div')
    temp.className = 'size box border'
    temp.style.backgroundColor = colors[clickCount]

    myButton.textContent = `Kort ${clickCount} `

    const img = document.createElement('img')
    img.src = myimg
    img.alt = persons[clickCount]
    img.style.maxWidth = '100%'
    img.style.maxHeight = '100%'

    const info = document.createElement('div')
    info.innerHTML = `${persons[clickCount]}<br>${years[clickCount]}`
    info.style.textAlign = 'center'

    // skriv ut på sidan
    temp.appendChild(img)
    temp.appendChild(info)
    container.appendChild(temp)

    clickCount++
  } else {
    myButton.remove()
  }
})
