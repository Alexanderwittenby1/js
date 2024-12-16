import { africa, america, europe, randomAnimal } from './modules/kmom02/names.js'
import { greeting } from './modules/kmom02/greeting.js'

const randomAnimalElement = document.getElementById('randomAnimal')
randomAnimalElement.innerHTML = `
<h3> African animals: ${randomAnimal(africa)}</h3>
<h3> European animals: ${randomAnimal(europe)}</h3>
<h3> American animals: ${randomAnimal(america)}</h3>`

const whatTime = document.getElementById('date')
whatTime.innerHTML = `<h3>${greeting()}</h3>`
